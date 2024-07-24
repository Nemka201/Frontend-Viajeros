import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Video } from '../models/video.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private baseUrl = environment.URL + 'Videos';

  constructor(private http: HttpClient) {}

  /**
   * Base URL for video API endpoints.
   */
  // Removed redundant VideoRoute property and assigned base URL directly in constructor

  /**
   * Adds a new video to the server.
   *
   * @param video The video data transfer object.
   * @returns An observable of the created video or an error.
   */
  public AddVideo(video: Video): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post<any>(url, video).pipe(
      catchError((error) => {
        console.error('Error adding video:', error);
        throw error; // Re-throw the error for handling in the component
      })
    );
  }

  /**
   * Updates an existing video on the server.
   *
   * @param id The ID of the video to update.
   * @param video The updated video data transfer object.
   * @returns An observable indicating successful update or an error.
   */
  public UpdateVideo(id: number, video: Video): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, video).pipe(
      catchError((error) => {
        console.error('Error updating video:', error);
        throw error; // Re-throw the error for handling in the component
      })
    );
  }

  /**
   * Deletes a video from the server.
   *
   * @param id The ID of the video to delete.
   * @returns An observable indicating successful deletion or an error.
   */
  public DeleteVideo(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError((error) => {
        console.error('Error deleting video:', error);
        throw error; // Re-throw the error for handling in the component
      })
    );
  }

  /**
   * Retrieves a single video by its ID.
   *
   * @param id The ID of the video to retrieve.
   * @returns An observable of the retrieved video or an error.
   */
  public GetVideo(id: number): Observable<Video> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Video>(url).pipe(
      catchError((error) => {
        console.error('Error getting video:', error);
        throw error; // Re-throw the error for handling in the component
      })
    );
  }

  /**
   * Retrieves all videos from the server, potentially with pagination.
   * Consider using GetByIndexVideos for pagination instead.
   *
   * @returns An observable of an array of videos or an error.
   */
  public GetVideos(): Observable<Video[]> {
    const url = `${this.baseUrl}/GetAll`; // Might require pagination depending on data volume
    return this.http.get<Video[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting videos:', error);
        throw error; // Re-throw the error for handling in thecomponent
      })
    );
  }

  /**
   * Retrieves videos associated with a specific tag.
   *
   * @param id The ID of the tag to filter by.
   * @returns An observable of an array of videos or an error.
   */
  public GetVideosByTag(id: number): Observable<Video[]> {
    const url = `<span class="math-inline">\{this\.baseUrl\}/GetByTag/</span>{id}`;
    return this.http.get<Video[]>(url).pipe(
      catchError((error) => {
        console.error('Error getting videos by tag:', error);
        throw error; // Re-throw the error for handling in the component
      })
    );
  }
  /**
   * Retrieves a specific number of videos ordered by date.
   *
   * @returns An observable of an array of videos or an error.
   */
  public GetLastVideos(): Observable<Video[]> {
    const url = `${this.baseUrl}/GetLasts`;
    return this.http.get<Video[]>(url);
  }
  /**
   * Retrieves a specific number of videos starting from a given index.
   *
   * @param pageIndex The starting index of videos to retrieve (zero-based).
   * @param pageSize The number of videos to retrieve.
   * @returns An observable of an array of videos or an error.
   */
  public GetByIndexVideos(
    pageIndex: number,
    pageSize: number
  ): Observable<Video[]> {
    const url = `${this.baseUrl}/GetByIndex/${pageIndex}/${pageSize}`;
    return this.http.get<Video[]>(url);
  }
  /**
   * Retrieves the total number of videos available.
   *
   * @returns An observable of the total video count or an error.
   */
  public GetCount(): Observable<number> {
    const url = `${this.baseUrl}/VideoCount`;
    return this.http.get<number>(url);
  }
}
