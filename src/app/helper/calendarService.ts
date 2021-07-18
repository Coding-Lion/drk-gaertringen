import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import * as e from "express";
import ICAL from "ical.js/build/ical";

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  private calendarUrl =
    "https://files.drk-gaertringen.de/remote.php/dav/public-calendars/tA3YfEPtzcN3qYte?export";

  events: Event[] = [];
  private now: any;
  delayedData?: Promise<void>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    @Optional() @Inject("calendarData") public calendarData: string,
    private readonly transferState: TransferState
  ) {
    const storeKey = makeStateKey<string>("calendarData");
    if (isPlatformBrowser(this.platformId)) {
      //get message from transferState if browser side
      this.calendarData = this.transferState.get(storeKey, undefined);
    } //server side: get provided message and store in in transfer state
    else {
      this.transferState.set(storeKey, this.calendarData);
    }
    if (!this.calendarData) {
      this.delayedData = new Promise(res => {

        http.get(this.calendarUrl, { responseType: "text" }).subscribe((data) => {
          this.processData(data);
          res();
        });
      })
    } else {
      this.processData(this.calendarData);
    }
  }

  private processData(data: string) {
    let eventList: Event[] = [];
    const now = ICAL.Time.now();
    this.now = now;

    function pushEvent(event: any, date: any, categories: string[]) {
      
      if (now.compare(date) <= 0) {
        let endDate = date.clone();
        endDate.addDuration(event.duration);
        eventList.push({
          name: event.summary,
          location: event.location,
          startDate: date.toJSDate(),
          endDate: endDate.toJSDate(),
          categories,
        })
      }
    }


    const jcalData = ICAL.parse(data);
    const vcalendar = new ICAL.Component(jcalData);
    const events = vcalendar
      .getAllSubcomponents("vevent");
    for (const rawEvent of events) {
      const event = new ICAL.Event(rawEvent);
      const categories = rawEvent.getAllProperties("categories").map(category => category.getValues()).flat(1);
      if (event.isRecurring()) {
        const iterator = event.iterator();
        let time = new ICAL.Time(iterator.next());
        for (let i = 0; i < 20 && !iterator.complete; i++) {
          time = new ICAL.Time(iterator.next());
          pushEvent(event,time,categories);
        }
      } else {
        pushEvent(event,event.startDate,categories);
      }
    }

    this.events.push(...eventList.sort((a,b) => a.startDate.getTime() - b.startDate.getTime()));
  }
}

export type Event = {
  startDate: Date;
  endDate: Date;
  name: string;
  location: string;
  categories: string[];
};
