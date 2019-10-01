import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tag/tag.component';


const routes: Routes = [
  { path: 'tags/:tag', component: TagComponent, data: {animation: 'Home'} },
  { path: 'tags', component: TagsComponent, data: {animation: 'About'} },
  { path: ':id', component: PostComponent, data: {animation: 'Contact'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
