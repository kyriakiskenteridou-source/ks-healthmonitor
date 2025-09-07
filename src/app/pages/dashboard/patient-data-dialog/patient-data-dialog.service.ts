import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facility } from '../../../shared/models/facilities.model';

@Injectable({
  providedIn: 'root'
})
export class PatientDataDialogService {
  private baseUrl ='http://localhost:3000';   //'http://62.74.232.210:4566/healthmonitor/';

  constructor(private http: HttpClient) {}

  getFacilities():Observable<any> {
    return this.http.get(`${this.baseUrl}/facilities`);
  }

  savePatient(patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, patientData);
  }
}
