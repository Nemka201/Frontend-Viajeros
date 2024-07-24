import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
@Component({
  selector: 'app-mosaic-video',
  templateUrl: './mosaic-video.component.html',
  styleUrls: ['./mosaic-video.component.css']
})
export class MosaicVideoComponent {
  @Input() videoUrl: string = "";

  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) {}

  getVideoIframe(url: string): SafeResourceUrl {
    const videoIdMatch = url.match('[\\?&]v=([^&#]*)');
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return '';
  }
}

// import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-mosaic-video',
//   templateUrl: './mosaic-video.component.html',
//   styleUrls: ['./mosaic-video.component.css']
// })
// export class MosaicVideoComponent {
//   @Input() videoUrl: string = "";
//   player: YT.Player | null = null;

//   constructor(private sanitizer: DomSanitizer) {}

//   ngAfterViewInit() {
//     // Create a new YouTube player after view initialization

//     this.player = new YT.Player('player', {
//       height: '0', // Set height to 0 to hide the player
//       width: '100%', // Set width to desired size
//       videoId: this.getVideoId(this.videoUrl),
//       events: {
//         'onReady': this.player?.pauseVideo
//       }
//     });
//   }

//   ngOnDestroy() {
//     // Destroy the player when the component is destroyed
//     if (this.player) {
//       this.player.destroy();
//     }
//   }

//   getVideoIframe(url: string): SafeResourceUrl {
//     const videoIdMatch = url.match('[\\?&]v=([^&#]*)');
//     const videoId = videoIdMatch ? videoIdMatch[1] : null;
//     if (videoId) {
//       const embedUrl = `https://www.youtube.com/embed/${videoId}`;
//       return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
//     }
//     return '';
//   }

//   getVideoId(url: string): string {
//     const videoIdMatch = url.match('[\\?&]v=([^&#]*)');
//     return videoIdMatch ? videoIdMatch[1] : '';
//   }
// }





