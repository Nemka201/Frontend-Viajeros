import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { HomeComponent } from './views/home/home.component';
import { PostsComponent } from './views/posts/posts.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { VideosIndexComponent } from './components/videos-index/videos-index.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    PostComponent,
    ContactFormComponent,
    HomeComponent,
    PostsComponent,
    SocialMediaComponent,
    VideoCardComponent,
    VideosIndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
