import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import * as GhostContentAPI from "node_modules/@tryghost/content-api/umd/content-api.min.js";
import { PostComponent } from "./post/post.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from '@angular/forms';
import { TagsComponent } from './tags/tags.component';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';

@NgModule({
   declarations: [
      AppComponent,
      PostComponent,
      HeaderComponent,
      TagsComponent,
      TagComponent
   ],
   imports: [
      FormsModule,
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      DemoMaterialModule,
      CommonModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
  constructor() {
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