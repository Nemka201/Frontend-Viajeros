import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TagService {
  constructor(private HttpClient: HttpClient) { }
  TagRoute = environment.URL + "Tags"

  public AddTag(tag: Tag): Observable<any>{
    return this.HttpClient.post<any>(this.TagRoute + '/Add', tag);
  }
  public GetTag(id: number) : Observable<Tag>{
    return this.HttpClient.get<Tag>(this.TagRoute + `/${id}`);
  }
  public GetTags () : Observable<Tag[]>{
    return this.HttpClient.get<Tag[]>(this.TagRoute);
  }
  public UpdateTag (id: number, post: Tag) : Observable<any>{
    return this.HttpClient.put<any> (this.TagRoute + `/${id}`, post);
  }
  public DeleteTag (id: number) : Observable<any>{
    return this.HttpClient.delete<any> (this.TagRoute + `/${id}`)
  }
}
