import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Viajeros';
  ngOnInit(){
    const cld = new Cloudinary({cloud:{cloudName:environment.cloudinary.cloudName}});
  }
}
