import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PostsComponent } from './views/posts/posts.component';
import { EditVideoComponent } from './views/videos/edit-video/edit-video.component';
import { AuthGuard } from './components/pipes/route-guard';
import { VideosComponent } from './views/videos/videos.component';
import { EditPostViewComponent } from './views/posts/edit-post-view/edit-post-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Posts', component: PostsComponent, canActivate:[AuthGuard]},
  {path: 'Posts/:id', component: EditPostViewComponent, canActivate:[AuthGuard]},
  {path: 'Videos', component: VideosComponent, canActivate:[AuthGuard]},
  {path: 'Videos/:id', component: EditVideoComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
