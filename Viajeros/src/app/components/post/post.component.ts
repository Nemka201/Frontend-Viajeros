import { Component } from '@angular/core';
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

  constructor(
    private postService: PostService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.LoadPosts();
    this.isLogged = this.tokenService.getToken() ? true : false;
  }
  LoadPosts() {
    this.postService.GetPosts().subscribe((data) => {
      this.posts = data;
    });
  }
  DeletePost(id?: number) {
    if (id != undefined) {
      this.postService.DeletePost(id).subscribe(
        (data) => {
          this.LoadPosts();
        },
        (error) => {
          alert('No se pudo eliminar');
        }
      );
    }
  }
}
