import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
import { AddVideoComponent } from './views/videos/add-video/add-video.component';
import { AddPostComponent } from './components/post/add-post/add-post.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { EditVideoComponent } from './views/videos/edit-video/edit-video.component';
import { RegisterComponent } from './components/login/register/register.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { LastPostComponent } from './components/post/last-post/last-post.component';
import { LastVideoComponent } from './components/video-card/last-video/last-video.component';
import { LogoutButtonComponent } from './components/login/logout-button/logout-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TagsComponent } from './components/videos-index/tags/tags.component';
import { AddTagComponent } from './components/videos-index/tags/add-tag/add-tag.component';
import { EditTagComponent } from './components/videos-index/tags/edit-tag/edit-tag.component';
import { MatSelectModule } from '@angular/material/select';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { MosaicVideoComponent } from './components/video-card/mosaic-video/mosaic-video.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VideosComponent } from './views/videos/videos.component';
import { AddPostViewComponent } from './views/posts/add-post-view/add-post-view.component';
import { EditPostViewComponent } from './views/posts/edit-post-view/edit-post-view.component';



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
    LastVideoComponent,
    LogoutButtonComponent,
    TagsComponent,
    AddTagComponent,
    EditTagComponent,
    MosaicVideoComponent,
    VideosComponent,
    AddPostViewComponent,
    EditPostViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    CommonModule,
    CloudinaryModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
