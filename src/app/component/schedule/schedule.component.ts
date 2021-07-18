import { Component, Input, OnInit } from '@angular/core';
import { CalendarService, Event } from 'src/app/helper/calendarService';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  events: Event[] = [];

  constructor(private calendarService: CalendarService) { }

  @Input() scheduleCategory: string;
  @Input() fallback: string = "";



  ngOnInit(): void {
    this.events = this.calendarService.events;
    this.filterEvents();

    if (this.calendarService.delayedData) this.calendarService.delayedData.then(() => this.filterEvents());
    
  }

  filterEvents() {
    if (this.scheduleCategory) {
      this.events = [];
      for (const event of this.calendarService.events) {
        if (event.categories.includes(this.scheduleCategory)) this.events.push(event);
      }
    }
  }

}
