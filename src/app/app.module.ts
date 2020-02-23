import { BrowserModule, DomSanitizer, BrowserTransferStateModule } from "@angular/platform-browser";
import {
  NgModule,
  PLATFORM_ID,
  APP_ID,
  Inject,
  PipeTransform,
  Pipe
} from "@angular/core";

import { AppRoutingModule } from "./main/app-routing.module";
import { AppComponent } from "./main/app.component";
import { PostComponent } from "./page/post/post.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";
import { HeaderComponent } from "./component/header/header.component";
import { FormsModule } from "@angular/forms";
import { TagsComponent } from "./page/tags/tags.component";
import { CommonModule } from "@angular/common";
import { TagComponent } from "./page/tag/tag.component";
import { HttpClientModule } from '@angular/common/http';
import { GhostApi } from './helper/ghostApi';
import { IsSameOrigin } from './helper/isSameOrigin';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { PostCardsComponent } from './component/post-cards/post-cards.component';
import { FooterComponent } from './component/footer/footer.component';
import { MetaHelper } from './helper/metaHelper';
import { LinkService } from './helper/linkService';
import { ScriptService } from './helper/scriptService';
import { NotFoundComponent } from './page/not-found/not-found.component';

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
    TagComponent,
    WelcomeComponent,
    PostCardsComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "rk-angular" }),
    BrowserTransferStateModule,
    AppRoutingModule,
    DemoMaterialModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    GhostApi,
    IsSameOrigin,
    MetaHelper,
    LinkService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {

  }
}