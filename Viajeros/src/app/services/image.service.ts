import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostImage } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private HttpClient: HttpClient) { }

  imageRoute = environment.URL + "Images"
  public AddPost(image: PostImage): Observable<any>{
    return this.HttpClient.post<any>(this.imageRoute + '/Add', image);
  }
  public GetImage(id: number) : Observable<PostImage>{
    return this.HttpClient.get<PostImage>(this.imageRoute + `/Get/${id}`);
  }
  public GetImages () : Observable<PostImage[]>{
    return this.HttpClient.get<PostImage[]>(this.imageRoute + '/Get');
  }
  public UpdateImage (id: number, image: PostImage) : Observable<any>{
    return this.HttpClient.put<any> (this.imageRoute + `/Update/${id}`, image);
  }
  public DeleteImage (id: number) : Observable<any>{
    return this.HttpClient.delete<any> (this.imageRoute + `/Delete/${id}`)
  }
}
