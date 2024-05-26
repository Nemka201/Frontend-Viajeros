import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent {
  videoForm: FormGroup;

  constructor(private videoService: VideoService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.videoForm = this.formBuilder.group({
      Title: [''],
      Description: ['']
    });
  }

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.videoService.GetVideo(id).subscribe(
      data => {
        this.videoForm = this.formBuilder.group({
          Title: data.name,
          Description: data.description,
        });
      },
      error => {alert("Error al modificar el post");}
    )

  }
  UpdatePost() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.videoService.UpdateVideo(id,this.videoForm.value).subscribe(data => {
      alert("Post agregado correctamente");
    });
  }
}
