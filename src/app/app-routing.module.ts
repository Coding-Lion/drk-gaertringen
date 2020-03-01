import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, UrlHandlingStrategy, UrlTree, UrlSerializer } from '@angular/router';
import { PostComponent } from './page/post/post.component';
import { TagsComponent } from './page/tags/tags.component';
import { TagComponent } from './page/tag/tag.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { PostResolveService } from './page/post/postResolveService';
import { TagPostsResolveService } from './page/tag/tagPostsResolveService';
import { TagResolveService } from './page/tag/tagResolveService';
import { WelcomeResolveService } from './page/welcome/welcomeResolveService';
import { NotFoundComponent } from './page/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, resolve: { data: WelcomeResolveService } },
  { path: 'tag/:tag', component: TagComponent, resolve: { posts: TagPostsResolveService, tag: TagResolveService } },
  { path: 'tag', component: TagsComponent},
  { path: ':id', component: PostComponent, resolve: { data: PostResolveService } },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "top",
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {

}