import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { Settings, GhostApi } from "../helper/ghostApi";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { IsSameOrigin } from "../helper/isSameOrigin";
import { isPlatformBrowser } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  static animationDelay = 200;
  static previousUrl: string = undefined;
  title = "drk-angular";
  isLoading = false;
  settings: Settings = { navigation: [] } as any;
  static instance: AppComponent;

  constructor(
    private ghostApi: GhostApi,
    private router: Router,
    public isSameOrigin: IsSameOrigin,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    AppComponent.instance = this;
    ghostApi.getSettings().subscribe(settings => (this.settings = settings));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.router.events.subscribe(evt => {
      switch (evt.constructor) {
        case NavigationEnd:
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
          }
          this.isLoading = false;
          AppComponent.previousUrl = this.router.url;
          break;
        case NavigationStart:
          if (AppComponent.previousUrl != undefined)
            this.isLoading = true;
          break;
        default:
          break;
      }
    });
  }
}
