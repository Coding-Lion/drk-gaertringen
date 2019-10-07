import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlHandlingStrategy, UrlTree, UrlSerializer } from '@angular/router';
import { PostComponent } from '../page/post/post.component';
import { TagsComponent } from '../page/tags/tags.component';
import { TagComponent } from '../page/tag/tag.component';
import { WelcomeComponent } from '../page/welcome/welcome.component';
import { PostResolveService } from '../page/post/postResolveService';
import { TagPostsResolveService } from '../page/tag/tagPostsResolveService';
import { TagResolveService } from '../page/tag/tagResolveService';
import { WelcomeResolveService } from '../page/welcome/welcomeResolveService';


const routes: Routes = [
  { path: '', component: WelcomeComponent, resolve: { data: WelcomeResolveService } },
  { path: 'tag/:tag', component: TagComponent, resolve: { posts: TagPostsResolveService, tag: TagResolveService } },
  { path: 'tag', component: TagsComponent},
  { path: ':id', component: PostComponent, resolve: { post: PostResolveService } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "top",
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }