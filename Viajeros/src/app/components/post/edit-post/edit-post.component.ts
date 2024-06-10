import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Post, PostDTO } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UploadCloudinaryService } from 'src/app/services/upload-cloudinary.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  postForm: FormGroup;
  files: File[] = [];
  @Input() post: any;
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
    this.postForm.patchValue({
      Title: this.post.title,
      Description: this.post.description,
      images: [],
    });
  }

  async UpdatePost() {
    const updatedPost: Post = {
      id: this.post.id,
      title: this.postForm.value.Title,
      description: this.postForm.value.Description,
      images: [],
    };
  
    try {
      let imagesUrl;
      if (this.files && this.files.length > 0){
        imagesUrl = await lastValueFrom(this.cloudinaryService.uploadMultipleImages(this.files));
        }
      const imagesArray: string[] = imagesUrl || [];  
      const postDTO: PostDTO = {
        post: updatedPost,
        imagesUrl: imagesArray,
      };
      console.log(postDTO)

      this.postService.UpdatePost(this.post.id, postDTO).subscribe((data) => {
        alert('Post modificado correctamente.');
      });
    } catch (error) {
      console.error('Error al modificar el post:', error);
    }
  }
  
  AddImages() {
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
