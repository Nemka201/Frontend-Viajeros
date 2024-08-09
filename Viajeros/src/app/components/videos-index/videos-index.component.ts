import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { TokenService } from 'src/app/services/jwt.service';
import { Tag } from 'src/app/models/tag.model';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-videos-index',
  templateUrl: './videos-index.component.html',
  styleUrls: ['./videos-index.component.css']
})
export class VideosIndexComponent implements OnInit {
  isLogged: boolean = false;
  lastVideos: Video[] = [];
  videos: Video[] = [];
  searchTerm: string = '';
  displayedVideos: Video[] = [];

  constructor(
    private videoService: VideoService,
    private tokenService: TokenService
  ) {
    this.displayedVideos = [];
    this.videos = [];
    // Verifico si el usuario está logeado
    this.isLogged = this.tokenService.getToken() ? true : false;
  }

  ngOnInit(): void {

    // Llamo los últimos videos para mostrar
    this.loadLastVideos();
    this.fetchVideos();

  }

  // Metodos

  loadLastVideos(): void {
    this.videoService.GetLastVideos()
      .pipe(
        map(data => data.slice(0, 5)),
        catchError(error => {
          console.error('Error al cargar los últimos videos:', error);
          return of([]); // Retorna un array vacío en caso de error
        }),
        tap(videos => this.displayedVideos = videos)
      )
      .subscribe(videos => {this.lastVideos = videos
      });
  }
  
  fetchVideos(): void {
    this.videoService.GetVideos()
      .pipe(
        tap(data => {
          this.videos = data;
          localStorage.setItem('videos', JSON.stringify(data));
        }),
        catchError(error => {
          console.error('Error al cargar los videos:', error);
          return of([]); // Retorna un array vacío en caso de error
        })
      )
      .subscribe();
  }

  handleSearch() {
    if (this.searchTerm) {
      this.displayedVideos = this.videos.filter(video =>
        video.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.displayedVideos = this.lastVideos;
    }
  }

  onFilterByTags(selectedTags: Tag[]) {

    this.displayedVideos = this.videos.filter(
      video => video.tags?.some(tag => selectedTags.some(selectedTag => selectedTag.id === tag.tagId))
    );
  }
}
