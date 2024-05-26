import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      Title: [''],
      Description: ['']
    });
  }
  ngOnInit(){
  }
  AddPost() {
    this.postService.AddPost(this.postForm.value).subscribe(data => {
      alert("Post agregado correctamente.")
    });
  }
  AddImages(idPost: number) 
  {

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
