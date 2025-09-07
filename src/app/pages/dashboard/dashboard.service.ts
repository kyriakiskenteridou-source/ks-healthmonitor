import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl ='http://localhost:3000/patients';   //'http://62.74.232.210:4566/healthmonitor/';

  constructor(private http: HttpClient) {}

  getPatients(limit: number = 10, offset: number = 0) {
    const url = `${this.baseUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get(url);
  }
}
