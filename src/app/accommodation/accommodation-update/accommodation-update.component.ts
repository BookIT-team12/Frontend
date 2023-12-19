import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../../service/accommodation.service";
import {Accommodation, AccommodationType, BookingConfirmationType, Status} from "../../model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDtoModel} from "../../model/accommodation.dto.model";
import {AvailabilityPeriod} from "../../model/availability-period.model";
import {startWith} from "rxjs";
import {AvailabilityPeriodService} from "../../service/availability-period.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

//TODO: IZMENI DA BIRA AVAILIBILITY PERIOD, A NE DA IMA ZAKUCAN!!!
// DODATI LOKACIJU I SLIKE

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrls: ['./accommodation-update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationUpdateComponent implements OnInit{

  accommodationForm: FormGroup;
  checkedAmenities: number[] = []
  accommodation!: Accommodation;
  accommodationId!: number; // Accommodation ID retrieved from route parameter
  addingNewPeriod: boolean; //boolean that will determine enabled/disabled buttons for availability period changes and adding new one
  imagesFiles: File[];
  imageStrings: string[];
  blobUrls: SafeUrl[] = []; // Array to store blob URLs

    constructor(private accommodationService: AccommodationService, private fb: FormBuilder, private route: ActivatedRoute,
                private cdr:ChangeDetectorRef, private periodService: AvailabilityPeriodService, private sanitizer: DomSanitizer) {
        this.accommodation = new Accommodation("", AccommodationType.STUDIO, "","",0,
            0,[], [], [], BookingConfirmationType.AUTOMATIC, [],
            Status.APPROVED); //this exists just so i dont get error when scanning ngFor for availability periods in html
            //cause here accommodation is null and raises err, so i make it empty and then on ngInit i create it
      this.addingNewPeriod = true;
      this.imagesFiles = [];
      this.imageStrings = [];

      this.accommodationForm = this.fb.group({
            name: ['', [Validators.required]],
            maxGuests: ['', [Validators.required]],
            minGuests: ['', [Validators.required]],
            description: ['', [Validators.required]],
            accommodationType: ['', [Validators.required]],
            bookingConfirmationType: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            price: ['', [Validators.required]],
            images: this.imagesFiles,
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

        this.imageStrings = pair.second;

        this.accommodationForm.patchValue({
            name: this.accommodation.name,
            minGuests: this.accommodation.minGuests,
            maxGuests: this.accommodation.maxGuests,
            description: this.accommodation.description,
            accommodationType: this.accommodation.accommodationType,
            bookingConfirmationType: this.accommodation.bookingConfirmationType,
            parking: this.accommodation.containsAmenity(1),
            wifi: this.accommodation.containsAmenity(2),
            airConditioning: this.accommodation.containsAmenity(3),
            kitchen: this.accommodation.containsAmenity(4),
            bathroom: this.accommodation.containsAmenity(5),
            pool: this.accommodation.containsAmenity(6),
            balcony: this.accommodation.containsAmenity(7),
            images: this.convertStringListToImages()
        });
        console.log(this.accommodation)
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
      console.log("usla dobra funkcija")
      let newSelectedPeriod = event.value;
      console.log(newSelectedPeriod)
      if (newSelectedPeriod === 'none'){  //znaci dodajemo nov period
          this.addingNewPeriod = true;
          console.log("dodajemo novi period")
          this.onSelectingNone()
      } else {  //menjamo postojeci
          this.addingNewPeriod = false;
          this.onSelectingPeriod(newSelectedPeriod);
      }
  }
  onAddingPeriod(){
    let newPeriod: AvailabilityPeriod = new AvailabilityPeriod(null, this.accommodationForm.get('startDate')?.value,
                                  this.accommodationForm.get('endDate')?.value, this.accommodationForm.get('price')?.value)
    console.log(this.accommodation.availabilityPeriods)
    if (!this.periodService.doesNewPeriodOverlap(this.accommodation.availabilityPeriods, newPeriod)){
      this.accommodation.availabilityPeriods.push(newPeriod)
      this.cdr.detectChanges();
    } else {
      console.log("Preklapaju se!!! NE MOZE")
    }
  }
  onChangingPeriod(selectedPeriod: any){
    let isOverlaping:boolean = this.periodService.doesNewPeriodOverlap(this.accommodation.availabilityPeriods, //will new period be overlaping (before officially changing it
      new AvailabilityPeriod(undefined, this.accommodationForm.get('startDate')?.value,
      this.accommodationForm.get('endDate')?.value, this.accommodationForm.get('price')?.value));
    if(isOverlaping){
      console.log("NE MOZE PREKLAPACE SE")
    } else {
      let changed: AvailabilityPeriod | null = this.accommodation.findAvailabilityPeriod(selectedPeriod.id);  //find one to change
      changed ? changed.startDate = this.accommodationForm.get('startDate')?.value : null;
      changed ? changed.endDate = this.accommodationForm.get('endDate')?.value : null;
      changed ? changed.price = this.accommodationForm.get('price')?.value : null;
    }
    console.log(this.accommodation.availabilityPeriods)
    this.cdr.detectChanges()
  }
  onDeletingPeriod(selectedPeriod:any){
      this.accommodation.availabilityPeriods = this.accommodation.availabilityPeriods.filter(period => period !== selectedPeriod);
      this.cdr.detectChanges()
      console.log(this.accommodation.availabilityPeriods);
  }


  // Add a method to handle the changes in the amenities checkboxes
  onAmenityChange(event: any, amenity: number): void {
    // Handle the change in the checkbox state
    if (event.checked) {
      this.checkedAmenities.push(amenity);
    } else {
      // Remove the amenity if unchecked
      const index = this.checkedAmenities.findIndex(a => a === amenity);
      if (index !== -1) {
        this.checkedAmenities.splice(index, 1);
      }
    }
  }

  stringToUint8Array(str: string) {
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer;
  }


  convertStringListToImages(){
    // Convert List<string> to List<Uint8Array>
    let byteArraysList = this.imageStrings.map((str: string) => {
      return this.stringToUint8Array(str);
    });

    let filesToReturn : File[] = [];
    byteArraysList.forEach((byteArray: Uint8Array, index: number) => {
      const blob = new Blob([byteArray], { type: 'image/jpg' });
      const file = new File([blob], `image_${index}.jpg`, { type: 'image/jpg' });
      filesToReturn.push(file);
    });
    return filesToReturn;
  }

  get imagesFormArray() {
    return this.accommodationForm.get('images') as FormArray;
  }


  getUrl(file: File): string {
      console.log(URL.createObjectURL(file));
    return URL.createObjectURL(file);
  }

  getSafeUrl(image: Blob): SafeUrl { //drugacija fja od ovog natasinog..nesto za safeda bi moglo da radi pored nekog securitya
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image));
  }

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.imagesFiles.push(files.item(i) as File);
      }
    }
  }

  onSubmit(): void {

/*
    if (this.accommodationForm.valid) {
*/



      const updatedAccommodation = new Accommodation(
        this.accommodation.ownerEmail,
        this.accommodationForm.value.accommodationType as AccommodationType,
        this.accommodationForm.value.description,
        this.accommodationForm.value.name,
        this.accommodationForm.value.guests, // minGuests - You need to set this based on your requirement
        this.accommodationForm.value.guests,
        this.checkedAmenities,
        this.accommodation.reviews, // reviews - You need to set this based on your requirement
        this.accommodation.reservations, // reservations - You need to set this based on your requirement
        this.accommodationForm.value.bookingConfirmationType as BookingConfirmationType,
        [{
          id: 1, // You need to set this based on your requirement
          startDate: this.accommodationForm.value.fromDatePicker,
          endDate: this.accommodationForm.value.toDatePicker,
          price: this.accommodationForm.value.price,
        }], // Assuming you don't want to change availability periods
        Status.PENDING
      );

      this.accommodationService.updateAccommodation(updatedAccommodation.id, updatedAccommodation).subscribe(
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
