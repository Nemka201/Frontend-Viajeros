import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UploadCloudinaryService } from 'src/app/services/upload-cloudinary.service';
import { Post, PostDTO } from 'src/app/models/post.model';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.css'],
})
export class EditPostViewComponent {
  postForm: FormGroup;
  files: File[] = [];
  post: any;
  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cloudinaryService: UploadCloudinaryService
  ) {
    this.postForm = this.formBuilder.group({
      Title: [''],
      Description: [''],
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getPost(id);
    });
    this.postForm.patchValue({
      Title: this.post.title,
      Description: this.post.description,
      images: [],
    });
  }

  getPost(index: number) {
    try {
      this.postService.GetPost(index).subscribe((data) => (this.post = data));
    } catch (error) {
      alert('Error al obtener el post:');
      console.error(error);
    }
  }

  async updatePost() {
    const updatedPost: Post = {
      id: this.post.id,
      title: this.postForm.value.Title,
      description: this.postForm.value.Description,
      images: [],
    };

    try {
      let imagesUrl;
      if (this.files && this.files.length > 0) {
        imagesUrl = await lastValueFrom(
          this.cloudinaryService.uploadMultipleImages(this.files)
        );
      }
      const imagesArray: string[] = imagesUrl || [];
      const postDTO: PostDTO = {
        post: updatedPost,
        imagesUrl: imagesArray,
      };
      console.log(postDTO);

      this.postService.UpdatePost(this.post.id, postDTO).subscribe((data) => {
        alert('Post modificado correctamente.');
      });
    } catch (error) {
      console.error('Error al modificar el post:', error);
    }
  }

  addImages() {
    return this.cloudinaryService.uploadMultipleImages(this.files);
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
