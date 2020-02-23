import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, GhostApi, Settings } from 'src/app/helper/ghostApi';
import { Observable, zip } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AppComponent } from 'src/app/main/app.component';

@Injectable({
    providedIn: 'root',
})
export class PostResolveService implements Resolve<{ page: Post, settings: Settings }> {
    constructor(private ghostApi: GhostApi, private router: Router, @Inject(PLATFORM_ID) private  platformId: Object) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ page: Post, settings: Settings }> | Observable<never> {
        
        let id = route.paramMap.get('id');
        console.log(id);
        // const request = this.ghostApi.getPage(id);

        const request = zip(
            this.ghostApi.getPage(id),
            this.ghostApi.getSettings(),
        ).pipe(map((obj) => {
            console.log(obj)
            return {
                page: obj[0],
                settings: obj[1],
            }
        }))

        if (isPlatformBrowser(this.platformId) && AppComponent.previousUrl != undefined) {
            console.log("delay");
            return request.pipe(delay(AppComponent.animationDelay));
        } else {
            console.log("no delay");
            return request;
        }
    }
}