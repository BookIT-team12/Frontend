import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../../service/accommodation.service";
import {
  Accommodation,
  AccommodationStatus,
  AccommodationType,
  BookingConfirmationType
} from "../../model/accommodation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationResponseModel} from "../../model/accommodation.response.model";
import {AvailabilityPeriod} from "../../model/availability-period.model";
import {startWith} from "rxjs";
import {AvailabilityPeriodService} from "../../service/availability-period.service";
import {MatSelect} from "@angular/material/select";
import {AccommodationLocation} from "../../model/location.model";
import {MapService} from "../../service/map.service";
import {ImagesService} from "../../service/images.service";
import {AmenitiesService} from "../../service/amenities.service";
import {Amenity} from "../../model/amenity.model";
import {MatRadioChange} from "@angular/material/radio";
import {AccommodationValidationService} from "../../service/accommodation.validation.service";
import {DialogElementsExampleDialog} from "../accommodation-management/accommodation-management.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReservationService} from "../../service/reservation.service";
import {B} from "@angular/cdk/keycodes";


// TODO: VALIDACIJE(ZA OVO MI TREBA I REZERVACIJA!!!!)
@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrls: ['./accommodation-update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccommodationUpdateComponent implements OnInit, AfterViewInit{

  accommodationForm: FormGroup;
  accommodation!: Accommodation;
  accommodationId!: number;
  imageStrings :string[];
  imageFiles: File[];
  checkedAmenities: number[];
  availabilityPeriods: AvailabilityPeriod[];
  accommodationLocation: AccommodationLocation;

  addingNewPeriod: boolean; //boolean that will determine enabled/disabled buttons for availability period changes and adding new one
  @ViewChild('selectedPeriod') selectedPeriod!: MatSelect;

  constructor(private accommodationService: AccommodationService, private fb: FormBuilder, private route: ActivatedRoute,
              private cdr:ChangeDetectorRef, private periodService: AvailabilityPeriodService, private map: MapService,
              private imageService: ImagesService, private amenitiesService: AmenitiesService, private router: Router,
              private validationService: AccommodationValidationService, public dialog: MatDialog,
              private reservationService: ReservationService) {

      this.accommodation = new Accommodation("", AccommodationType.STUDIO, "","",0,
          0,[], [], [], BookingConfirmationType.AUTOMATIC, [],
          AccommodationStatus.APPROVED, map.undefinedBasicLocation, false, 0, true);
      //this exists just so i dont get error when scanning ngFor for availability periods in html
      //cause here accommodation is null and raises err, so i make it empty and then on ngInit i create it

      this.addingNewPeriod = true;
      this.imageStrings = [];
      this.imageFiles = [];
      this.checkedAmenities = [];
      this.availabilityPeriods = [];
      this.accommodationLocation = map.undefinedBasicLocation;

      this.accommodationForm = this.fb.group({
            name: ['', [Validators.required]],
            maxGuests: [0, [Validators.required]],
            minGuests: [0, [Validators.min(1)]],
            description: ['', [Validators.maxLength(200)]],
            accommodationType: [null, [Validators.required]],
            bookingConfirmationType: [null, [Validators.required]],
            endDate: [null],
            startDate: [null],
            price: [null],
            parking: false,
            wifi: false,
            airConditioning: false,
            kitchen: false,
            bathroom: false,
            pool: false,
            balcony: false,
            cancelAllow: [0, [Validators.min(0)]],
            priceByHead: true
        }, {validators: [validationService.minMaxGuestsValidator(), validationService.startBeforeEndValidatior()]});
  }

  ngOnInit(): void {
    this.accommodationId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.accommodationService.getAccommodationById(this.accommodationId).subscribe(
      (pair: AccommodationResponseModel) => {

        this.accommodation = new Accommodation(pair.first.ownerEmail, pair.first.accommodationType, pair.first.description,
            pair.first.name, pair.first.minGuests, pair.first.maxGuests, pair.first.amenities, pair.first.reviews,
            pair.first.reservations, pair.first.bookingConfirmationType, pair.first.availabilityPeriods, pair.first.status,
            pair.first.location, pair.first.isFavorite, pair.first.cancelAllow, pair.first.priceByHead)

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
            balcony: this.accommodation.containsAmenity(7),
            cancelAllow: this.accommodation.cancelAllow,
            priceByHead: this.accommodation.priceByHead
        });

        this.imageStrings = pair.second;
        this.imageService.setArrays(this.imageFiles, this.imageStrings);
        this.imageService.addFileTypeToImages();
        this.imageService.turnStringsToImages();

        this.checkedAmenities = this.accommodation.amenities;
        this.amenitiesService.setCheckedAmenities(this.checkedAmenities);

        this.availabilityPeriods = this.accommodation.availabilityPeriods;
        this.periodService.setExistingPeriods(this.availabilityPeriods)

        this.accommodationLocation = this.accommodation.location;
        this.map.setSelectedLocation(this.accommodationLocation);
        this.map.searchLocation(this.accommodationLocation.address);
      },
      (error) => {
        console.error('Error fetching accommodation data', error);
      }
    );
  }

  onSelectingPeriodGUI(newSelectedPeriod : AvailabilityPeriod){
      this.accommodationForm.patchValue({
          endDate: newSelectedPeriod.endDate,
          startDate: newSelectedPeriod.startDate,
          price: newSelectedPeriod.price
      })
  }
  onSelectingNoneGUI(){
      this.accommodationForm.patchValue({
          endDate: null,
          startDate: null,
          price: null
      })
  }
  async onSelectedPeriodChangeGUI(event: any){
      let newSelectedPeriod = event.value;
      if (newSelectedPeriod === 'none'){  //znaci dodajemo nov period
          this.addingNewPeriod = true;
          this.onSelectingNoneGUI()
      } else {  //menjamo postojeci
          let canSelect: Boolean | undefined = await this.reservationService.areThereReservationsInPeriod(newSelectedPeriod, this.accommodationId).toPromise();
          console.log("CAN SEELCT",canSelect)
          if (canSelect){
              this.addingNewPeriod = false;
              this.onSelectingPeriodGUI(newSelectedPeriod);
          } else {
              alert("THERE ARE RESERVATIONS FOR THIS PERIOD SO IT IS UNSELECTABLE!")
          }
      }
  }
  onAddingPeriod(){
    this.periodService.checkUpdatingAvailabilityPeriod(this.accommodationForm.value.startDate,
      this.accommodationForm.value.endDate, this.accommodationForm.value.price)
      if (this.periodService.isAvailabilityPeriodBad()){
          this.openPeriodErrorDialog();
          this.periodService.emptyMapOut();
          return;
      }
    let isAdded = this.periodService.addPeriod(this.accommodationForm.value.startDate,
      this.accommodationForm.value.endDate, this.accommodationForm.value.price)
    if (isAdded){
      this.resetPeriodsGUI();
      this.cdr.detectChanges();
    } else {
      this.periodService.setOverlappingPeriods();
      this.openPeriodErrorDialog();
      this.periodService.emptyMapOut();
    }
  }
  onChangingPeriod(selectedPeriod: any){
      this.periodService.checkUpdatingAvailabilityPeriod(this.accommodationForm.value.startDate,
          this.accommodationForm.value.endDate, this.accommodationForm.value.price)
      if (this.periodService.isAvailabilityPeriodBad()){
          this.openPeriodErrorDialog();
          this.periodService.emptyMapOut();
          return;
      }
    let isChanged = this.periodService.changePeriod(selectedPeriod, this.accommodationForm.value.startDate,
      this.accommodationForm.value.endDate, this.accommodationForm.value.price, selectedPeriod.id);
    if (isChanged) {
      this.resetPeriodsGUI()
      this.cdr.detectChanges()
    } else {
        this.periodService.setOverlappingPeriods();
        this.openPeriodErrorDialog()
        this.periodService.emptyMapOut();
    }
  }
  onDeletingPeriod(selectedPeriod:any){
      this.periodService.deletePeriod(selectedPeriod);
      this.resetPeriodsGUI();
      this.cdr.detectChanges();
  }
  resetPeriodsGUI(){
      this.addingNewPeriod = true;
      this.selectedPeriod.value = 'none'
      this.accommodationForm.patchValue({
          startDate: null,
          endDate: null,
          price: null
      })
      this.cdr.detectChanges();
  }

  onAmenityChange(event: any, amenity: Amenity): void {
    this.amenitiesService.onAmenityChange(event, amenity);
  }

  onFileSelected(event: any): void {
      this.imageService.onFileSelected(event);
      this.cdr.detectChanges();
}
  getUrl(file: File): string {
    return this.imageService.getUrl(file);
  }
  deleteImage(toDelete: File){
        this.imageService.deleteImage(toDelete);
        this.cdr.detectChanges();
  }

    openErrorDialog(){
        this.validationService.setListOfErrors(this.accommodationForm.errors, this.checkedAmenities, this.map.getSelectedLocation(), this.imageFiles);
        if (this.validationService.shouldOpenDialog()) {
            this.dialog.open(DialogElementsExampleDialog);
        }
    }

    openPeriodErrorDialog(){
      this.dialog.open(BadPeriodDialog);
    }

  onSubmit(): void {
      if(this.checkedAmenities.length === 0 || this.imageFiles.length === 0 || this.map.getSelectedLocation() === this.map.undefinedBasicLocation){
          this.openErrorDialog();   //these arent form fields, and that i why i need to check em here, cause they wont raise an error by themselves
          return;
      }
      if (this.accommodationForm.valid) {
          const updatedAccommodation = new Accommodation(
              this.accommodation.ownerEmail,
              this.accommodationForm.value.accommodationType,
              this.accommodationForm.value.description,
              this.accommodationForm.value.name,
              this.accommodationForm.value.minGuests,
              this.accommodationForm.value.maxGuests,
              this.checkedAmenities,
              this.accommodation.reviews,
              this.accommodation.reservations,
              this.accommodationForm.value.bookingConfirmationType as BookingConfirmationType,
              this.availabilityPeriods,
              AccommodationStatus.PENDING,
              this.accommodationLocation = this.map.updateLocation(this.accommodationLocation.id),
              false,
              this.accommodationForm.value.cancelAllow,
              this.accommodationForm.value.priceByHead
          );
          this.periodService.patchUpHourTimezoneProblem(updatedAccommodation.availabilityPeriods);
          this.accommodationService.updateAccommodation(updatedAccommodation, this.imageFiles, this.accommodationId).subscribe(
              (result) => {
                  console.log('Accommodation updated successfully', result);
                  console.log(updatedAccommodation)
                  this.router.navigate(["/main"])
              },
              (error) => {
                  console.error('Error updating accommodation', error);
              }
          );
      } else {
          console.error("INVALID FORM")
          console.log("Form errors:", this.accommodationForm.errors)
          this.openErrorDialog();
      }
  }
  protected readonly startWith = startWith;

  ngAfterViewInit(): void {
      this.map.InitAfterViewCreation();
  }

  onPricingPolicyChange($event: MatRadioChange) {
    if (this.accommodationForm.value.priceByHead){
      this.accommodationForm.value.priceByHead = false;
    }
    else {
      this.accommodationForm.value.priceByHead = true;
    }
  }

}

@Component({
    selector: 'bad-period-dialog',
    templateUrl: 'bad-period-dialog.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, NgForOf, MatIconModule, MatInputModule],
})
export class BadPeriodDialog {
    mapOfErrorsToDisplay: Map<string, boolean|undefined>;
    textToDisplay: string[] = [];
    endBeforeStartTxt = "End date cant be set before start date";
    priceNotPositiveTxt = "Price must be higher than 0";
    startDateInPastTxt = "Start date cannot be in the past";
    overlappingPeriodsTxt = "There is period that already covers these dates";

    constructor(private service: AvailabilityPeriodService) {
        this.mapOfErrorsToDisplay = this.service.getErrorsForDialog();
        if (this.mapOfErrorsToDisplay.get('endBeforeStart') === true){
            this.textToDisplay.push(this.endBeforeStartTxt);
        }
        if (this.mapOfErrorsToDisplay.get('priceNotPositive')){
            this.textToDisplay.push(this.priceNotPositiveTxt);
        }
        if (this.mapOfErrorsToDisplay.get('startDateInPast')){
            this.textToDisplay.push(this.startDateInPastTxt);
        }
        if (this.mapOfErrorsToDisplay.get('overlappingPeriods')){
            this.textToDisplay.push(this.overlappingPeriodsTxt);
        }
    }

}

