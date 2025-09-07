import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private selectedPatientSubject = new BehaviorSubject<Patient | null>(null); 
  selectedPatient$ = this.selectedPatientSubject.asObservable();

  setSelectedPatient(patient: Patient) {
    this.selectedPatientSubject.next(patient);
  }

  getSelectedPatient(): Patient | null {
    return this.selectedPatientSubject.getValue();
  }
}