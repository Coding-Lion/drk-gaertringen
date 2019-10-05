import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlHandlingStrategy, UrlTree, UrlSerializer } from '@angular/router';
import { PostComponent } from '../page/post/post.component';
import { TagsComponent } from '../page/tags/tags.component';
import { TagComponent } from '../page/tag/tag.component';
import { WelcomeComponent } from '../page/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, data: {animation: 'Welcome'} },
  { path: 'tag/:tag', component: TagComponent, data: {animation: 'Tag'} },
  { path: 'tag', component: TagsComponent, data: {animation: 'Tags'} },
  { path: ':id', component: PostComponent, data: {animation: 'Page'} }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }