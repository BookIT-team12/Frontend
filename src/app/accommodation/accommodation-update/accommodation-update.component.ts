import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../../service/accommodation.service";
import {
  Accommodation,
  AccommodationStatus,
  AccommodationType,
  BookingConfirmationType
} from "../../model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDtoModel} from "../../model/accommodation.dto.model";
import {AvailabilityPeriod} from "../../model/availability-period.model";
import {startWith} from "rxjs";
import {AvailabilityPeriodService} from "../../service/availability-period.service";
import {MatSelect} from "@angular/material/select";


// DODATI LOKACIJU I SLIKE

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrls: ['./accommodation-update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationUpdateComponent implements OnInit{

  accommodationForm: FormGroup;
  accommodation!: Accommodation;
  accommodationId!: number; // Accommodation ID retrieved from route parameter
  addingNewPeriod: boolean; //boolean that will determine enabled/disabled buttons for availability period changes and adding new one
  imageStrings :string[];
  imageFiles: File[];

  @ViewChild('selectedPeriod') selectedPeriod!: MatSelect;

  constructor(private accommodationService: AccommodationService, private fb: FormBuilder, private route: ActivatedRoute,
              private cdr:ChangeDetectorRef, private periodService: AvailabilityPeriodService) {
      this.accommodation = new Accommodation("", AccommodationType.STUDIO, "","",0,
          0,[], [], [], BookingConfirmationType.AUTOMATIC, [],
          AccommodationStatus.APPROVED); //this exists just so i dont get error when scanning ngFor for availability periods in html
          //cause here accommodation is null and raises err, so i make it empty and then on ngInit i create it
    this.addingNewPeriod = true;
    this.imageStrings = [];
      this.imageFiles = [];
    this.accommodationForm = this.fb.group({
          name: ['', [Validators.required]],
          maxGuests: ['', [Validators.required]],
          minGuests: ['', [Validators.required]],
          description: ['', [Validators.required]],
          accommodationType: ['', [Validators.required]],
          bookingConfirmationType: ['', [Validators.required]],
          endDate: [''],
          startDate: [''],
          price: [''],
          images: [],
          parking: false,
          wifi: false,
          airConditioning: false,
          kitchen: false,
          bathroom: false,
          pool: false,
          balcony: false
      });
  }

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    // Fetch accommodation data by ID and populate the form
    this.accommodationService.getAccommodationById(this.accommodationId).subscribe(

      (pair: AccommodationDtoModel) => {

        this.accommodation = new Accommodation(pair.first.ownerEmail, pair.first.accommodationType, pair.first.description,
            pair.first.name, pair.first.minGuests, pair.first.maxGuests, pair.first.amenities, pair.first.reviews,
            pair.first.reservations, pair.first.bookingConfirmationType, pair.first.availabilityPeriods, pair.first.status)

        this.accommodationForm.patchValue({
            name: this.accommodation.name,
            minGuests: this.accommodation.minGuests,
            maxGuests: this.accommodation.maxGuests,
            description: this.accommodation.description,
            accommodationType: this.accommodation.accommodationType.toString(),
            bookingConfirmationType: this.accommodation.bookingConfirmationType,
            parking: this.accommodation.containsAmenity(1),
            wifi: this.accommodation.containsAmenity(2),
            airConditioning: this.accommodation.containsAmenity(3),
            kitchen: this.accommodation.containsAmenity(4),
            bathroom: this.accommodation.containsAmenity(5),
            pool: this.accommodation.containsAmenity(6),
            balcony: this.accommodation.containsAmenity(7)
        });

        this.imageStrings = pair.second;
        this.addFileTypeToImages();
        this.turnStringsToImages();
      },
      (error) => {
        console.error('Error fetching accommodation data', error);
      }
    );
  }

  onSelectingPeriod(newSelectedPeriod : AvailabilityPeriod){
      this.accommodationForm.patchValue({
          endDate: newSelectedPeriod.endDate,
          startDate: newSelectedPeriod.startDate,
          price: newSelectedPeriod.price
      })
  }
  onSelectingNone(){
      this.accommodationForm.patchValue({
          endDate: '',
          startDate: '',
          price: ''
      })
  }
  onSelectedPeriodChange(event: any){
      let newSelectedPeriod = event.value;
      if (newSelectedPeriod === 'none'){  //znaci dodajemo nov period
          this.addingNewPeriod = true;
          this.onSelectingNone()
      } else {  //menjamo postojeci
          this.addingNewPeriod = false;
          this.onSelectingPeriod(newSelectedPeriod);
      }
  }
  onAddingPeriod(){
    let newPeriod: AvailabilityPeriod = new AvailabilityPeriod(undefined, this.accommodationForm.get('startDate')?.value,
                                  this.accommodationForm.get('endDate')?.value, this.accommodationForm.get('price')?.value)
    if (!this.periodService.doesNewPeriodOverlap(this.accommodation.availabilityPeriods, newPeriod)){
      console.log('kreiran period', newPeriod)
      this.accommodation.availabilityPeriods.push(newPeriod)
      console.log('lista sa novim periodom:', this.accommodation.availabilityPeriods);
      this.resetPeriodsGUI();
      this.cdr.detectChanges();
      console.log('lista sa novim periodom:', this.accommodation.availabilityPeriods);
    } else {
      alert("Vec postoji period koji pokriva ovo vreme!!")
    }
  }
  onChangingPeriod(selectedPeriod: any){
    let existingPeriods = this.accommodation.availabilityPeriods.slice();
    console.log(existingPeriods);
    existingPeriods = existingPeriods.filter(item => item !== selectedPeriod);
    let isOverlaping:boolean = this.periodService.doesNewPeriodOverlap(existingPeriods, //will new period be overlaping (before officially changing it)
      new AvailabilityPeriod(selectedPeriod.id, this.accommodationForm.get('startDate')?.value,
      this.accommodationForm.get('endDate')?.value, this.accommodationForm.get('price')?.value));
    if(isOverlaping){
      alert("Vec postoji period koji pokriva ovo vreme!!!")
    } else {
      let changed: AvailabilityPeriod | null = this.accommodation.findAvailabilityPeriod(selectedPeriod.id);  //find one to change
      changed ? changed.startDate = this.accommodationForm.get('startDate')?.value : null;
      changed ? changed.endDate = this.accommodationForm.get('endDate')?.value : null;
      changed ? changed.price = this.accommodationForm.get('price')?.value : null;
      this.resetPeriodsGUI();
    }
    this.cdr.detectChanges()
  }
  onDeletingPeriod(selectedPeriod:any){
      this.accommodation.availabilityPeriods = this.accommodation.availabilityPeriods.filter(period => period !== selectedPeriod);
      this.resetPeriodsGUI()
      this.cdr.detectChanges()
  }
  resetPeriodsGUI(){
      this.addingNewPeriod = true;
      this.selectedPeriod.value = 'none'
      this.accommodationForm.get('endDate')?.reset();
      this.accommodationForm.get('startDate')?.reset();
      this.accommodationForm.get('price')?.reset();
      this.cdr.detectChanges();
  }

  // Add a method to handle the changes in the amenities checkboxes
  onAmenityChange(event: any, amenity: number): void {
    // Handle the change in the checkbox state
    if (event.checked) {
      this.accommodation.amenities.push(amenity);
    } else {
      // Remove the amenity if unchecked
      const index = this.accommodation.amenities.findIndex(a => a === amenity);
      if (index !== -1) {
        this.accommodation.amenities.splice(index, 1);
      }
    }
  }
  //todo: change not to be fixed OWNER
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
        this.cdr.detectChanges();
    }

    //fixme: go through the file structure one more time to see if you can refactor anything here to make your life easier for later
    //fixme: same thing for timezones as in the accommodation managment component!!!! this just adds 1 hour doesnt really fix the issue. I think its about timezones!
  patchTimeUp(periods : AvailabilityPeriod[]){
      for (let i =0; i!=periods.length; i++){
        periods[i].startDate.setHours(periods[i].startDate.getHours() + 1);
        periods[i].endDate.setHours(periods[i].endDate.getHours() + 1);
      }
  }
  onSubmit(): void {
    // let valToAdd: AccommodationType= AccommodationType.ROOM;
    // if (this.accommodationForm.value.accommodationType == "HOTEL"){
    //   valToAdd = AccommodationType.HOTEL
    // } else if (this.accommodationForm.value.accommodationType == "STUDIO"){
    //   valToAdd = AccommodationType.STUDIO
    // } if (this.accommodationForm.value.accommodationType == "APARTMENT"){
    //   valToAdd = AccommodationType.APARTMENT
    // } if (this.accommodationForm.value.accommodationType == "ROOM"){
    //   valToAdd = AccommodationType.ROOM
    // }
    // console.log('valToAdd:', typeof valToAdd)
    // console.log(valToAdd === AccommodationType.STUDIO)
    const updatedAccommodation = new Accommodation(
        this.accommodation.ownerEmail,
        this.accommodationForm.value.accommodationType,
        this.accommodationForm.value.description,
        this.accommodationForm.value.name,
        this.accommodationForm.get('minGuests')?.value, // minGuests - You need to set this based on your requirement
        this.accommodationForm.get('maxGuests')?.value,
        this.accommodation.amenities,
        this.accommodation.reviews, // reviews - You need to set this based on your requirement
        this.accommodation.reservations, // reservations - You need to set this based on your requirement
        this.accommodationForm.value.bookingConfirmationType as BookingConfirmationType,
        this.accommodation.availabilityPeriods,
        AccommodationStatus.PENDING
      );
      this.patchTimeUp(updatedAccommodation.availabilityPeriods);
      this.accommodationService.updateAccommodation(updatedAccommodation, this.imageFiles, this.accommodationId).subscribe(
        (result) => {
          console.log('Accommodation updated successfully', result);
        },
        (error) => {
          console.error('Error updating accommodation', error);
        }
      );
    }
    protected readonly startWith = startWith;
}
