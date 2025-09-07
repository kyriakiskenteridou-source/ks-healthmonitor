import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailService {
  private baseUrl = 'http://62.74.232.210:4566/healthmonitor';  //'http://localhost:3000';   

  constructor(private http: HttpClient) {}

  getPatientDetailedInfo(id: number) {
    const url = `${this.baseUrl}/patients?patient_id=${id}&details=true`;
    return this.http.get(url);
  }

  getRealmeasurements(id: number, detail: string = 'second', lastvalues: number = 1) {
    const url = `${this.baseUrl}/realmeasurements?patient_id=${id}&detail=${detail}&lastvalues=${lastvalues}`;
    return this.http.get(url);
  }
}



