import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostDTO } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private HttpClient: HttpClient) { }

  postRoute = environment.URL + 'Posts'

  /**
   * Adds a new post to the server.
   *
   * @param postDto The post data transfer object.
   * @returns An observable of the created post or an error.
   */

  public AddPost(postDto: PostDTO): Observable<any> {
    return this.HttpClient.post<any>(this.postRoute, postDto).pipe(
      catchError((error) => {
        console.error('Error al agregar el post:', error);
        return throwError(() => new Error('Error al agregar el post')); 
      })
    );
  }
  /**
   * Retrieves a single post by its ID.
   *
   * @param id The ID of the post to retrieve.
   * @returns An observable of the retrieved post or an error.
   */

  public GetPost(id: number) : Observable<Post>{
    const url = `${this.postRoute}/${id}`;
    return this.HttpClient.get<Post>(this.postRoute + `/${id}`);
  }

  /**
   * Retrieves all posts from the server.
   *
   * @returns An observable of an array of posts or an error.
   */

  public GetPosts () : Observable<Post[]>{
    return this.HttpClient.get<Post[]>(this.postRoute);
  }
  /**
   * Retrieves a specific number of posts starting from a given index.
   *
   * @param pageIndex The starting index of posts to retrieve (zero-based).
   * @returns An observable of an array of 8 posts or an error.
   */

  public GetIndexedPosts (pageIndex: number) : Observable<Post[]>{
    const url = `${this.postRoute}/Index/${pageIndex}`;
    return this.HttpClient.get<Post[]>(url);
  }
  /**
   * Updates an existing post on the server.
   *
   * @param id The ID of the post to update.
   * @param postDto The updated post data transfer object.
   * @returns An observable indicating successful update or an error.
   */
  public UpdatePost (id:number ,post: PostDTO) : Observable<any>{
    const url = `${this.postRoute}/${id}`;
    return this.HttpClient.put<any> (url, post);
  }
  /**
   * Deletes a post from the server.
   *
   * @param id The ID of the post to delete.
   * @returns An observable indicating successful deletion or an error.
   */
  public DeletePost (id: number) : Observable<any>{
    const url = `${this.postRoute}/${id}`;
    return this.HttpClient.delete<any> (url)
  }
  /**
   * Retrieves a specific number of posts starting from a given index.
   *
   * @param pageIndex The starting index of posts to retrieve (zero-based).
   * @param pageSize The number of posts to retrieve.
   * @returns An observable of an array of posts or an error.
   */

  public GetByIndexPosts(pageIndex: number, pageSize: number): Observable<Post[]> {
    const url = `${this.postRoute}/GetByIndex/${pageIndex}/${pageSize}`;
    return this.HttpClient.get<Post[]>(url);
  }

  /**
   * Retrieves the total number of posts available.
   *
   * @returns An observable of the total post count or an error.
   */

  public GetCount(): Observable<number> {
    const url = `${this.postRoute}/VideoCount`;
    return this.HttpClient.get<number>(url);
  }
}