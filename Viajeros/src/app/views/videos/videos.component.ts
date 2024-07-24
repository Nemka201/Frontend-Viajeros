import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';

/**
 * This component displays a list of videos in a Material table with pagination.
 */
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent {
  videos = new MatTableDataSource<Video>();
  videosFetched: Video[] = [];
  pageSize = 10;
  currentPage = 0;
  totalVideos: number = 0;

  constructor(private videoService: VideoService) {}

  /**
   * Fetches videos from the server on component initialization.
   */
  ngOnInit() {
    this.fetchVideos();
  }

  /**
   * Deletes a video by ID.
   *
   * @param index The ID of the video to delete.
   */
  deleteVideo(index: number) {
    try {
      this.videoService.DeleteVideo(index).subscribe((data) => {
        alert('Video eliminado.');
        console.log(data);
        // Update the data source after deletion (consider filtering or refetching)
        this.fetchVideos(); // Update displayed data
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetches videos from the server based on the current page and page size.
   * Updates the data source and total video count.
   *
   * @param pageIndex The current page index (zero-based).
   * @param pageSize The number of videos to fetch per page.
   */
  fetchVideos(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.videoService.GetByIndexVideos(pageIndex, pageSize)
      .pipe(
        map((data) => data), // No transformation needed here
        catchError((error) => {
          console.error('Error al cargar los videos:', error);
          // Provide a default empty array to prevent data source issues
          return of([]); // Handle error and provide an empty array
        })
      )
      .subscribe((videos) => {
        this.videosFetched = videos;
        this.videos = new MatTableDataSource<Video>(this.videosFetched);
        this.getCountVideos(); // Update total count of videos
      });
  }

  /**
   * Fetches the total number of videos from the server.
   * Updates the totalVideos property.
   */
  getCountVideos() {
    this.videoService.GetCount()
      .pipe(
        map((data) => (data as unknown as { count: number }).count),
        catchError((error) => {
          console.error('Error fetching video count:', error);
          return of(0); // Handle error and provide a default value for totalVideos
        })
      )
      .subscribe((totalVideos) => {
        this.totalVideos = totalVideos;
      });
  }

  /**
   * Concatenates the names of all tags in the provided array and returns a string.
   *
   * @param tags An array of Tag objects.
   * @returns A comma-separated string of tag names or an empty string if no tags are provided.
   */
  getTagsAsString(tags: Tag[]): string {
    return tags?.map((tag) => tag.name).join(', ') || '';
  }

  /**
   * Handles pagination events from the Material paginator.
   * Updates the current page and page size, then fetches videos accordingly.
   *
   * @param event The page event object from the Material paginator.
   */
  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchVideos(this.currentPage, this.pageSize);
  }
}
