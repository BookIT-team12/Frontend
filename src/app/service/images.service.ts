import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imageStrings: string[] = [];
  imageFiles: File[] = [];
  constructor(){  }
  setArrays(imagesFromPage: File[], dataFromPage:string[]) {
    this.imageStrings = dataFromPage;
    this.imageFiles = imagesFromPage;
  }
  addFileTypeToImages(){
    let typeImage:string = "data:image/png;base64,"
    for (let i = 0; i!= this.imageStrings.length; i++){
      this.imageStrings[i] = typeImage + this.imageStrings[i];
    }
  }
  base64StringToFile(base64String: string, fileName: string): File {
    // Remove the data:image/png;base64, prefix from the Base64 string
    const base64WithoutPrefix = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    // Convert the Base64 string to a Blob
    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Change the type based on your image type (png/jpeg)

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: 'image/png' }); // Change the type based on your image type (png/jpeg)

    return file;
  }
  turnStringsToImages(){
    for(let i = 0; i!= this.imageStrings.length; i++){
      this.imageFiles.push(this.base64StringToFile(this.imageStrings[i], "accommodation_picture"+i+".jpg"))
    }
  }
  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.imageFiles.push(files.item(i) as File);
      }
    }
  }
  getUrl(file: File): string {
    return URL.createObjectURL(file);
  }
  deleteImage(toDelete: File){
    let index = this.imageFiles.findIndex((image: File) => image === toDelete);
    if (index !== -1) {
      this.imageFiles.splice(index, 1);
    }
    // this.cdr.detectChanges();
  }
}
