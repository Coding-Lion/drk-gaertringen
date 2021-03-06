import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, GhostApi, Settings } from 'src/app/helper/ghostApi';
import { Observable, zip } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Injectable({
    providedIn: 'root',
})
export class WelcomeResolveService implements Resolve<WelcomeResolveServiceData> {
    constructor(private ghostApi: GhostApi, private router: Router, @Inject(PLATFORM_ID) private  platformId: Object) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WelcomeResolveServiceData> | Observable<never> {

        const request = zip(
            this.ghostApi.getFilteredPages("featured:true"),
            this.ghostApi.getFilteredPages("tag:aktuelles"),
            this.ghostApi.getFilteredPages("tag:helfer-vor-ort"),
            this.ghostApi.getFilteredPages("tag:angebote"),
            this.ghostApi.getFilteredPages("tag:aktiv-werden"),
            this.ghostApi.getFilteredPages("tag:hash-welcome"),
            this.ghostApi.getSettings(),
        ).pipe(map((obj) => {
            return {
                featured: obj[0],
                news: obj[1],
                hvo: obj[2],
                angebote: obj[3],
                aktivWerden: obj[4],
                welcome: obj[5],
                settings: obj[6],
            }
        }))

        if (isPlatformBrowser(this.platformId) && AppComponent.previousUrl != undefined) {
            return request.pipe(delay(AppComponent.animationDelay));
        } else {
            return request;
        }
    }
}

export type WelcomeResolveServiceData = { featured: Post[], news: Post[], hvo: Post[], angebote: Post[], welcome: Post[], aktivWerden: Post[], settings: Settings };