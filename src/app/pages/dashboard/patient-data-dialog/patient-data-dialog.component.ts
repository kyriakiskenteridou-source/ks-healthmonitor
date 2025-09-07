import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientDataDialogService } from './patient-data-dialog.service';
import { Facility } from '../../../shared/models/facilities.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-data-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-data-dialog.component.html',
  styleUrl: './patient-data-dialog.component.scss'
})
export class PatientDataDialogComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  patientForm: FormGroup = new FormGroup({});
  facilities: Facility[] = []

  readonly patientDataDialogService = inject(PatientDataDialogService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadFacilities();

    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required]], // Validators.email to avoid invalid while testing
      facility_id: ['', Validators.required],
      address_street: ['', Validators.required],
      address_number: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postalCode: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      amka: ['', Validators.required],
      phonenumber: ['']
    });
  }

  private loadFacilities() {
    this.patientDataDialogService.getFacilities().subscribe({
      next: (res: any) => {
        this.facilities = res;
      },
      error: (err) => {
        console.error('Failed to load facilities:', err);
      }
    });
  }

  submitForm() {
    if (this.patientForm.valid) {
      const rawData = this.patientForm.value;
      const age = this.getAgeFromDate(rawData.birthDate);
      const transformedData = {
        ...rawData,
        age,
        ext_patient: true
      };
      delete transformedData.birthDate;


      this.patientDataDialogService.savePatient(transformedData).subscribe(data => {
        console.log('loaded patients', data);
        this.save.emit();
        this.close.emit();
      });
    }
  }

  onCancel() {
    this.close.emit();
  }

  private getAgeFromDate(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
