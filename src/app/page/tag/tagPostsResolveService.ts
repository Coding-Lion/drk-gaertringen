import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, GhostApi, Tag } from 'src/app/helper/ghostApi';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { AppComponent } from 'src/app/main/app.component';

@Injectable({
    providedIn: 'root',
})
export class TagPostsResolveService implements Resolve<Post[]> {
    constructor(private ghostApi: GhostApi, private router: Router, @Inject(PLATFORM_ID) private  platformId: Object) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Observable<never> {
        let tag = route.paramMap.get('tag');
        const request = this.ghostApi.getFilteredPages("tag:" + tag);
        if (isPlatformBrowser(this.platformId)) {
            return request.pipe(delay(AppComponent.animationDelay));
        } else {
            return request;
        }
    }
}