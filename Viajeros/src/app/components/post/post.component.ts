import { Component, HostListener } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { TokenService } from 'src/app/services/jwt.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  posts: Post[] = [];
  isLogged: boolean = false;
  postId: any;
  currentPageIndex: number = 0;
  panelOpenState: boolean = false;

  constructor(
    private postService: PostService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.LoadPosts(this.currentPageIndex);
    this.isLogged = this.tokenService.getToken() ? true : false;
  }
  LoadPosts(startIndex: number) {
    this.postService.GetIndexedPosts(startIndex).subscribe((data) => {
      this.posts.push(...data);
    });
  }
  LoadMorePosts() {
    this.currentPageIndex++;
    this.LoadPosts(this.currentPageIndex);
  }
  SavePostId(newId:any){
    this.postId = newId;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    const containerHeight = document.querySelector('.container')?.clientHeight || 0;

    // Si el usuario se acerca al final del contenedor, carga más posts
    if (scrollPosition + window.innerHeight >= containerHeight * 0.8) {
      this.LoadMorePosts();
    }
  }
  DeletePost(id?: number) {
    if (id != undefined) {
      this.postService.DeletePost(id).subscribe({
        next: (data) => {
          console.log(data);
          this.LoadPosts(0); // Vuelve a cargar los posts después de eliminar
        },
        error: (error) => {
          alert('No se pudo eliminar');
          console.log(error);
        }
      });
    }
  }
}
