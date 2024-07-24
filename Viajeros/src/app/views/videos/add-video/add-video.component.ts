import { Component } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
})
export class AddVideoComponent {
  videoForm: FormGroup;
  tags: Tag[] = [];
  constructor(
    private videoService: VideoService,
    private tagService: TagService,
    private formBuilder: FormBuilder
  ) {
    this.videoForm = this.formBuilder.group({
      name: [''],
      description: [''],
      videoLink: [''],
      videoLinkSecond: [''],
      videoLinkThird: [''],
      videoLinkFourth: [''],
      categoryId: null,
    });
  }

  ngOnInit() {
    this.loadTags();
  }

  addVideo() {
    const video: Video = {
      name: this.videoForm.value.name,
      description: this.videoForm.value.description,
      videoLink: this.videoForm.value.videoLink,
      videoLinkSecond: this.videoForm.value.videoLinkSecond,
      videoLinkThird: this.videoForm.value.videoLinkThird,
      videoLinkFourth: this.videoForm.value.videoLinkFourth,
      tags: [
        {
          tagId: this.videoForm.value.categoryId,
        },
      ],
    };

    try {
      this.videoService.AddVideo(video).subscribe((data) => {
        alert('Programa agregado correctamente.');
      });
    } catch (error) {
      console.error('Error al subir el programa:', error);
    }
  }

  loadTags() {
    this.tagService.GetTags().subscribe((data) => this.tags.push(...data));
  }
}
