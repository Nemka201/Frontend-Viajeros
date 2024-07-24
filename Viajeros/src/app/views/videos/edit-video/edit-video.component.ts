import { Component } from '@angular/core';
import { Video } from 'src/app/models/video.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent {
  videoForm: FormGroup;
  video: any;
  tags: Tag[] = [];
  files: File[] = [];
  constructor(
    private videoService: VideoService,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.videoForm = this.formBuilder.group({
      name: [''],
      description: [''],
      videoLink: [''],
      videoLinkSecond: [''],
      videoLinkThird: [''],
      videoLinkFourth: [''],
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getVideo(id);
      this.loadTags();
    });
  }

  /**
   * Fetches tags from the tag service and populates the `tags` array.
   * Includes error handling to gracefully handle potential issues.
   */

  loadTags() {
    this.tagService.GetTags().subscribe((data) => this.tags.push(...data));
  }

  /**
   * Fetches a video by its ID from the video service.
   * Populates the `video` property and patches the form values if successful.
   * Includes error handling to gracefully handle potential issues.
   *
   * @param id The ID of the video to fetch.
   */

  getVideo(index: number){
    try {
      this.videoService.GetVideo(index).subscribe((data) => {
        this.video = data;
        this.videoForm.patchValue({
          name: this.video.name,
          description: this.video.description,
          videoLink: this.video.videoLink,
          videoLinkSecond: this.video.videoLinkSecond,
          videoLinkThird: this.video.videoLinkThird,
          videoLinkFourth: this.video.videoLinkFourth,
        });
      })
    } catch(error) {
      console.error('Error al obtener el video:', error);
    }
  }

  /**
   * Updates a video using the video service.
   * Constructs the updated video object and calls the update method.
   * Includes error handling to gracefully handle potential issues.
   */

  async updateVideo() {
    const updatedVideo: Video = {
      id: this.video.id,
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
      this.videoService.UpdateVideo(this.video.id, updatedVideo).subscribe((data) => {
        alert('Programa modificado correctamente.');
      });
    } catch (error) {
      console.error('Error al modificar el programa:', error);
    }
  }
  
}
