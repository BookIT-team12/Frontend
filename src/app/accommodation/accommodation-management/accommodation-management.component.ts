import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MapModule} from "../../map/map.module";

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css']
})
export class AccommodationManagementComponent {
  accommodationForm = {
    name: '',
    guests: null,
    price: null,
    description: '',
    images: [] as File[],
    imageUrl: '',
    accommodationType: '',  // Add accommodation type field
    bookingConfirmationType: '',  // Add booking confirmation type field
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.accommodationForm.images.push(files.item(i) as File);
      }
    }
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('name', this.accommodationForm.name);
    formData.append('guests', String(this.accommodationForm.guests));
    formData.append('price', String(this.accommodationForm.price));
    formData.append('description', this.accommodationForm.description);

    for (let i = 0; i < this.accommodationForm.images.length; i++) {
      formData.append('images', this.accommodationForm.images[i]);
    }

    this.http.post<any>('http://your-api-endpoint/upload', formData).subscribe(
      (response) => {
        this.accommodationForm.imageUrl = response.imageUrl;
      },
      (error) => {
        console.error('Error uploading file: ', error);
      }
    );
  }
  getUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
