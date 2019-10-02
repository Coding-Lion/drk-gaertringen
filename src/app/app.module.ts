import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import {
  NgModule,
  PLATFORM_ID,
  APP_ID,
  Inject,
  PipeTransform,
  Pipe
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import * as GhostContentAPI from "node_modules/@tryghost/content-api/umd/content-api.min.js";
import { PostComponent } from "./post/post.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { TagsComponent } from "./tags/tags.component";
import { CommonModule } from "@angular/common";
import { TagComponent } from "./tag/tag.component";
import { HttpClientModule } from '@angular/common/http';

@Pipe({ name: "safeHtml" })
export class SanitizeHtml implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}

@NgModule({
  declarations: [
    SanitizeHtml,
    AppComponent,
    PostComponent,
    HeaderComponent,
    TagsComponent,
    TagComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "rk-angular" }),
    AppRoutingModule,
    DemoMaterialModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    console.log(GhostContentAPI);
    ghostApi = new GhostContentAPI({
      url: "https://rkgaertringen.hyperleague.de",
      key: "400063becdc8344b52789110a5",
      version: "v2"
    });
    console.log(
      ghostApi.posts.browse().then((test: any[]) => {
        console.log(test);
      })
    );
  }
}

export let ghostApi;
