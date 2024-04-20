import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  postForm: FormGroup;
  files: File[] = [];

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      Title: [''],
      Description: ['']
    });
  }
  ngOnInit(){

  }
  AddPost() {
    this.postService.AddPost(this.postForm.value).subscribe(data => {
      // Lógica para manejar la respuesta
    });
  }
  AddImages(idPost: number) {
    // Lógica para añadir imágenes
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
