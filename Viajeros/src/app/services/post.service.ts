import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private HttpClient: HttpClient) { }

  PostRoute = environment.URL + 'Posts'

  public AddPost(post: Post): Observable<any>{
    return this.HttpClient.post<any>(this.PostRoute + '/Add', post);
  }
  public GetPost(id: number) : Observable<Post>{
    return this.HttpClient.get<Post>(this.PostRoute + `/Get/${id}`);
  }
  public GetPosts () : Observable<Post[]>{
    return this.HttpClient.get<Post[]>(this.PostRoute + '/Get');
  }
  public UpdatePost (id: number, post: Post) : Observable<any>{
    return this.HttpClient.put<any> (this.PostRoute + `/Update/${id}`, post);
  }
  public DeletePost (id: number) : Observable<any>{
    return this.HttpClient.delete<any> (this.PostRoute + `/Delete/${id}`)
  }
}