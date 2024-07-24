import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
  @Input() videoUrl: string = "";

  constructor(private sanitizer: DomSanitizer) {}

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


