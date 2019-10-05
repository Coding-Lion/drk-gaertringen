import { Component } from "@angular/core";
import { fadeAnimation } from "./route-animation";
import { Settings, GhostApi } from "../helper/ghostApi";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { IsSameOrigin } from "../helper/isSameOrigin";
import { isPlatformBrowser } from "@angular/common";
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = "rk-angular";
  isLoading = false;
  settings: Settings = { navigation: [] } as any;
  static instance: AppComponent;

  constructor(
    private ghostApi: GhostApi,
    private router: Router,
    public isSameOrigin: IsSameOrigin,
    private platform: Platform,
  ) {
    AppComponent.instance = this;
    ghostApi.getSettings().subscribe(settings => (this.settings = settings));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (isPlatformBrowser(this.platform)) {
        window.scrollTo(0, 0);
      }
    });
  }
}
