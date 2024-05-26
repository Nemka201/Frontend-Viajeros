import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostDTO } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private HttpClient: HttpClient) { }

  postRoute = environment.URL + 'Posts'

  public AddPost(postDto: PostDTO): Observable<any>{
    return this.HttpClient.post<any>(this.postRoute + '/Add', postDto);
  }
  public GetPost(id: number) : Observable<Post>{
    return this.HttpClient.get<Post>(this.postRoute + `/Get/${id}`);
  }
  public GetPosts () : Observable<Post[]>{
    return this.HttpClient.get<Post[]>(this.postRoute + '/Get');
  }
  public UpdatePost (id: number, post: Post) : Observable<any>{
    return this.HttpClient.put<any> (this.postRoute + `/Update/${id}`, post);
  }
  public DeletePost (id: number) : Observable<any>{
    return this.HttpClient.delete<any> (this.postRoute + `/Delete/${id}`)
  }
}