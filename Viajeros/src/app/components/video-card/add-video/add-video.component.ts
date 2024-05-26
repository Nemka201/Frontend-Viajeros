import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent {
  videoForm: FormGroup;
  constructor(private videoService: VideoService, private formBuilder: FormBuilder) {
    this.videoForm = this.formBuilder.group({
      Title: [''],
      Description: ['']
    });
  }
  ngOnInit(){
  }
  AddVideo() {
    this.videoService.AddVideo(this.videoForm.value).subscribe(data => {
      alert("Video agregado correctamente.")
    });
  }
}


