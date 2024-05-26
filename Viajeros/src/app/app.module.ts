import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './views/home/home.component';
import { PostsComponent } from './views/posts/posts.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { VideosIndexComponent } from './components/videos-index/videos-index.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddVideoComponent } from './components/videos-index/add-video/add-video.component';
import { AddPostComponent } from './components/post/add-post/add-post.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { EditVideoComponent } from './components/videos-index/edit-video/edit-video.component';
import { RegisterComponent } from './components/login/register/register.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { LastPostComponent } from './components/post/last-post/last-post.component';
import { LastVideoComponent } from './components/video-card/last-video/last-video.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    PostComponent,
    HomeComponent,
    PostsComponent,
    SocialMediaComponent,
    VideoCardComponent,
    VideosIndexComponent,
    LoginComponent,
    AddVideoComponent,
    AddPostComponent,
    EditPostComponent,
    EditVideoComponent,
    RegisterComponent,
    LastPostComponent,
    LastVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    CommonModule,
    CloudinaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
