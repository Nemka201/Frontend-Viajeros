import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

/**
 * This component displays a list of posts in a Material table with pagination.
 */
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts = new MatTableDataSource<Post>();
  pageSize = 10;
  currentPage = 0;
  totalPosts: number = 0;

  constructor(private postService: PostService) {}

  /**
   * Fetches posts from the server on component initialization.
   */
  ngOnInit() {
    this.fetchPosts();
  }

  /**
   * Truncates the description to the specified length and displays it.
   *
   * @param description The description string to truncate.
   * @param maxLength The maximum length to display (default: 50).
   * @returns The truncated description with an ellipsis if exceeded.
   */
  truncateDescription(description: string, maxLength = 70): string {
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
  }

  /**
   * Deletes a post by ID and updates the displayed data source.
   *
   * @param index The ID of the post to delete.
   */
  deletePost(index: number) {
    try {
      this.postService.DeletePost(index).subscribe((data) => {
        alert('Post eliminado.');
        console.log(data);
        this.fetchPosts(); // Update displayed data after deletion
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetches posts from the server based on the current page and page size.
   * Updates the data source and total post count.
   *
   * @param pageIndex The current page index (zero-based).
   * @param pageSize The number of posts to fetch per page.
   */
  fetchPosts(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.postService.GetByIndexPosts(pageIndex, pageSize).subscribe(
      (data) => {
        this.posts = new MatTableDataSource<Post>(data);
        this.getCountPosts(); // Update total count of posts
      },
      (error) => {
        console.error('Error al cargar los posts:', error);
      }
    );
  }

  /**
   * Fetches the total number of posts from the server.
   * Updates the totalPosts property.
   */

  getCountPosts() {
    this.postService.GetCount()
      .pipe(
        map((data) => (data as unknown as { count: number }).count),
        catchError((error) => {
          console.error('Error fetching post count:', error);
          return of(0); // Handle error and provide a default value for totalPosts
        })
      )
      .subscribe((totalPosts) => {
        this.totalPosts = totalPosts;
      });
  }
  /**
   * Handles pagination events from the Material paginator.
   * Updates the current page and page size, then fetches posts accordingly.
   *
   * @param event The page event object from the Material paginator.
   */
  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchPosts(this.currentPage, this.pageSize);
  }
}
