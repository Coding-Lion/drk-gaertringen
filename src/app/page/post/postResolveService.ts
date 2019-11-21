import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, GhostApi } from 'src/app/helper/ghostApi';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AppComponent } from 'src/app/main/app.component';

@Injectable({
    providedIn: 'root',
})
export class PostResolveService implements Resolve<Post> {
    constructor(private ghostApi: GhostApi, private router: Router, @Inject(PLATFORM_ID) private  platformId: Object) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Observable<never> {
        
        let id = route.paramMap.get('id');
        console.log(id);
        const request = this.ghostApi.getPage(id);
        if (isPlatformBrowser(this.platformId) && AppComponent.previousUrl != undefined) {
            console.log("delay");
            return request.pipe(delay(AppComponent.animationDelay));
        } else {
            console.log("no delay");
            return this.ghostApi.getPage(id);
        }
    }
}