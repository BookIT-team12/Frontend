import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AccommodationService } from "../../service/accommodation.service";
import { Amenity } from "../../model/amenity.model";
import {Accommodation, AccommodationType, BookingConfirmationType} from "../../model/accommodation.model";
import {DomEvent} from "leaflet";
import on = DomEvent.on;
import {ActivatedRoute} from "@angular/router";

//TODO: IZMENI DA BIRA AVAILIBILITY PERIOD, A NE DA IMA ZAKUCAN!!!
// DODATI LOKACIJU I SLIKE

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrls: ['./accommodation-update.component.css']
})
export class AccommodationUpdateComponent implements OnInit{

  accommodationForm: FormGroup;
  amenities: Amenity[] = [];
  accommodation!: Accommodation;
  images: File[]=[]; //TODO: UVEZI SLIKE I LOKACIJU NA BEKU!
  accommodationId!: number; // Accommodation ID retrieved from route parameters

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.accommodationForm = this.fb.group({
      name: ['', [Validators.required]],
      guests: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      accommodationType: ['', [Validators.required]],
      bookingConfirmationType: ['', [Validators.required]],
      fromDatePicker: ['', [Validators.required]],
      toDatePicker: ['', [Validators.required]]
    });



    // Fetch accommodation data by ID and populate the form
    this.accommodationService.getAccommodationById(this.accommodationId).subscribe(

      (accommodation: Accommodation) => {

        this.accommodation = accommodation;

        console.log(accommodation)
        // Populate the form with the retrieved accommodation data
        this.accommodationForm.patchValue({

          name: accommodation.name,
          guests: accommodation.maxGuests,
//          price: accommodation.availabilityPeriods[0].price, //TODO: IZMENITI DA IZ LISTE AVAILIBILITY PERIODS BIRA ONAJ KOJI ZELI DA IZMENI I CIJU CE CENU MENJATI
          description: accommodation.description,
          accommodationType: accommodation.accommodationType,
          bookingConfirmationType: accommodation.bookingConfirmationType,
//          fromDatePicker:new Date(accommodation.availabilityPeriods[0].startDate),
//          toDatePicker:new Date(accommodation.availabilityPeriods[0].endDate)

        });

        accommodation.amenities.forEach((amenity:Amenity)=>{
            this.amenities.forEach((formAmenity:Amenity)=>{
              if(amenity.id==formAmenity.id){
                const checkbox={checked:true};
                this.onAmenityChange(checkbox,amenity);
              }
            });
          }
        );


      },
      (error) => {
        console.error('Error fetching accommodation data', error);
      }
    );
  }

  constructor(private accommodationService: AccommodationService, private fb: FormBuilder, private route: ActivatedRoute) {

    this.accommodationForm = this.fb.group({
      name: ['', [Validators.required]],
      guests: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      accommodationType: ['', [Validators.required]],
      bookingConfirmationType: ['', [Validators.required]],
      fromDatePicker:['', [Validators.required]],
      toDatePicker: ['', [Validators.required]],
    });





  }

  // Add a method to handle the changes in the amenities checkboxes
  onAmenityChange(event: any, amenity: Amenity): void {
    // Handle the change in the checkbox state
    if (event.checked) {
      this.amenities.push(amenity);
    } else {
      // Remove the amenity if unchecked
      const index = this.amenities.findIndex(a => a.id === amenity.id);
      if (index !== -1) {
        this.amenities.splice(index, 1);
      }
    }
  }

  getUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.images.push(files.item(i) as File);
      }
    }
  }

  onSubmit(): void {

/*
    if (this.accommodationForm.valid) {
*/



      const updatedAccommodation = new Accommodation(
        this.accommodation.id,
        this.accommodation.ownerEmail,
        this.accommodationForm.value.accommodationType as AccommodationType,
        this.accommodationForm.value.description,
        this.accommodationForm.value.name,
        this.accommodationForm.value.guests, // minGuests - You need to set this based on your requirement
        this.accommodationForm.value.guests,
        this.amenities,
        this.accommodation.reviews, // reviews - You need to set this based on your requirement
        this.accommodation.reservations, // reservations - You need to set this based on your requirement
        this.accommodationForm.value.bookingConfirmationType as BookingConfirmationType,
        [{
          id: 1, // You need to set this based on your requirement
          startDate: this.accommodationForm.value.fromDatePicker,
          endDate: this.accommodationForm.value.toDatePicker,
          price: this.accommodationForm.value.price,
        }], // Assuming you don't want to change availability periods

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

}
