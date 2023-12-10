import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css']
})
export class AccommodationManagementComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('http://your-api-endpoint/upload', formData).subscribe(
        (response) => {
          this.imageUrl = response.imageUrl;
        },
        (error) => {
          console.error('Error uploading file: ', error);
        }
      );
    }
  }
}


