import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video, VideoTag } from '../models/video.model';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  constructor(private HttpClient: HttpClient) { }

  VideoRoute = environment.URL + 'Videos'

  public AddVideo(video: Video): Observable<any>{
    return this.HttpClient.post<any>(this.VideoRoute, video);
  }
  public UpdateVideo(id: number, video: Video): Observable<any>{
    return this.HttpClient.put<any>(this.VideoRoute + `/${id}`, video);
  }
  public DeleteVideo (id: number): Observable<any>{
    return this.HttpClient.delete<any>(this.VideoRoute + `/${id}`);
  }
  public GetVideo (id: number) : Observable<Video> {
    return this.HttpClient.get<Video>(this.VideoRoute + `/${id}`);
  }
  public GetVideos () : Observable<Video[]> {
    return this.HttpClient.get<Video[]>(this.VideoRoute + '/GetAll');
  }
  public GetVideosByTag (id: number) : Observable<Video[]> {
    return this.HttpClient.get<Video[]>(this.VideoRoute + `/GetByTag/${id}`);
  }
  public GetLastVideos () : Observable<Video[]> {
    return this.HttpClient.get<Video[]>(this.VideoRoute + '/GetLasts')
  }
}