import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  postForm: FormGroup;
  files: File[] = [];
  constructor(private postService: PostService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.postForm = this.formBuilder.group({
      Title: [''],
      Description: ['']
    });
  }
  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.postService.GetPost(id).subscribe(
      data => {
        this.postForm = this.formBuilder.group({
          Title: data.title,
          Description: data.description,
        });
      },
      error => {alert("Error al modificar el post");}
    )

  }
  UpdatePost() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.postService.UpdatePost(id,this.postForm.value).subscribe(data => {
      alert("Post agregado correctamente");
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
