import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post, PostDTO } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UploadCloudinaryService } from 'src/app/services/upload-cloudinary.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postForm: FormGroup;
  files: File[] = [];
  constructor(private postService: PostService, private formBuilder: FormBuilder, private cloudinaryService: UploadCloudinaryService) {
    this.postForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
  }
  ngOnInit(){
  }
  AddPost() {
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      images: [] 
    };
  
    try {
      this.cloudinaryService.uploadMultipleImages(this.files).subscribe(imagesUrl => {
        const postDTO: PostDTO = {
          post,
          imagesUrl 
        };
        this.postService.AddPost(postDTO).subscribe(data => {
          alert('Post agregado correctamente.');
        });
      });
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }
  
  AddImages() 
  {
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
