import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { TokenService } from 'src/app/services/jwt.service';
import { Tag } from 'src/app/models/tag.model';

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
    this.videoService.GetLastVideos().subscribe(
      (data) => {
        this.lastVideos = data.slice(1, 5);
        this.displayedVideos = this.lastVideos;
      },
      (error) => {
        console.error('Error al cargar los videos:', error);
      }
    );

  }

  fetchVideos(): void {
    this.videoService.GetVideos().subscribe(
      (data) => {
        console.log(data)
        this.videos = data;
        localStorage.setItem('videos', JSON.stringify(this.videos));
        console.log(this.videos)
      },
      (error) => {
        console.error('Error al cargar los videos:', error);
      }
    );
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
      video => video.tags?.some(tag => selectedTags.some(selectedTag => selectedTag.id === tag.id))
    );
  }
}
