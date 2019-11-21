import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { GhostApi, Tag } from "src/app/helper/ghostApi";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";
import {
  isPlatformBrowser,
} from "@angular/common";
import { AppComponent } from "src/app/main/app.component";

@Injectable({
  providedIn: "root"
})
export class TagResolveService implements Resolve<Tag> {
  constructor(
    private ghostApi: GhostApi,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Tag> | Observable<never> {
    let tag = route.paramMap.get("tag");
    const request = this.ghostApi.getTag(tag);
    if (isPlatformBrowser(this.platformId) && AppComponent.previousUrl != undefined) {
      return request.pipe(delay(AppComponent.animationDelay));
    } else {
      return request;
    }
  }
}
