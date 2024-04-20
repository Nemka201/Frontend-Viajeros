import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
@Component({
  selector: 'app-videos-index',
  templateUrl: './videos-index.component.html',
  styleUrls: ['./videos-index.component.css']
})
export class VideosIndexComponent implements OnInit{
  Videos: Video[] = [];
  constructor(private videoService: VideoService) {}
  ngOnInit(): void {
    this.LoadLastVideos();
  }
  LoadLastVideos() : void{
    this.videoService.GetLastVideos().subscribe(data => {this.Videos = data});
  }
}
