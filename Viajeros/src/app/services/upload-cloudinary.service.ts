import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadCloudinaryService {
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }
  uploadImages(files: File[]) {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }
  uploadMultipleImages(files: File[]): Observable<string[]> {
    const uploadObservables: Observable<any>[] = [];
  
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', environment.cloudinary.apiKey);
      formData.append('upload_preset', environment.cloudinary.uploadPreset);
      uploadObservables.push(this.http.post(this.cloudinaryUrl, formData));
    });
  
    // Usamos forkJoin para esperar a que todas las cargas se completen
    return forkJoin(uploadObservables).pipe(
      map(responses => {
        return responses.map(response => response.url);
      })
    );
  }
}
