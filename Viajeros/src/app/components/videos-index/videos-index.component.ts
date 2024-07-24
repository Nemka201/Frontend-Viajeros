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
    this.LoadLastVideos();

    // Implement caching logic (assuming localStorage is available)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const lastFetchDateStr = localStorage.getItem('lastVideoFetch');
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 día en milisegundos

    if (lastFetchDateStr) {
      // If data exists in localStorage, check freshness
      const lastFetchDate = new Date(lastFetchDateStr);
      const difference = currentDate.getTime() - lastFetchDate.getTime();

      if (Math.abs(difference) >= oneDayInMilliseconds) {
        // Fetch videos if data is older than a day
        this.FetchVideos(formattedDate);
      } else {
        // Use data from localStorage if it's freshA
        this.videos = JSON.parse(localStorage.getItem('videos')!); // Use non-null assertion for clarity
      }
    }
    if(!localStorage.getItem('videos')) {
      // Fetch videos if no data exists in localStorage
      this.FetchVideos(formattedDate);
    }
  }

  // Metodos

  LoadLastVideos(): void {
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

  FetchVideos(currentDate: string): void {
    this.videoService.GetVideos().subscribe(
      (data) => {
        this.videos = data;
        localStorage.setItem('videos', JSON.stringify(this.videos));
        localStorage.setItem('lastVideoFetch', currentDate);
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
    // Filter videos based on selectedTags
    console.log(this.videos);
    console.log("Videos-index");
    console.log(selectedTags)
    this.displayedVideos = this.videos.filter(
      video => video.tags?.some(tag => selectedTags.some(selectedTag => selectedTag.id === tag.id))
    );
  }
}
