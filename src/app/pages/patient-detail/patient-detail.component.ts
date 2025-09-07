import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientDetailService } from './patient-detail.service';
import { MeasurementCardComponent } from './measurement-card/measurement-card.component';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/models/patient.model';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

interface BloodPressureData {
  timestamp: string;
  patient_id: number;
  sys_blood_pressure: string;
  dia_blood_pressure: string;
}

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [RouterModule, MeasurementCardComponent, PatientInfoComponent],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss'
})
export class PatientDetailComponent {
  measurements: any;
  patient: Patient = {} as Patient

  @ViewChild('bpChart') bpChartRef!: ElementRef;
  chart: any;
  private bloodPressureData: BloodPressureData[] = [];

  readonly patientDetailService = inject(PatientDetailService);
  readonly patientService = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.patient = this.patientService.getSelectedPatient() || {}as Patient;
    console.log(this.patient);
    this.setMeasurements();
    this.getRealmeasurements();
  }

  private setMeasurements() {
    this.measurements = [
      { key: 'heart_rate', value: this.patient?.heart_rate },
      { key: 'sys_blood_pressure', value: this.patient?.sys_blood_pressure },
      { key: 'dia_blood_pressure', value: this.patient?.dia_blood_pressure },
      { key: 'oxygen_saturation', value: this.patient?.oxygen_saturation },
      { key: 'temperature', value: this.patient?.temperature },
      { key: 'steps', value: this.patient?.steps },
      { key: 'distance', value: this.patient?.distance },
      { key: 'weight', value: this.patient?.weight },
    ];
  }

  private getRealmeasurements() {
    const patientId = this.patient?.patient_id;
    if (patientId) {
      this.patientDetailService.getRealmeasurements(patientId, 'hour', 24)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.bloodPressureData =  data.bloodpressure;
        console.log('real data',this.bloodPressureData );
        this.createChart();
      });
    }
  }

  private createChart() {
    const ctx = this.bpChartRef.nativeElement.getContext('2d');

    const labels = this.bloodPressureData
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map(entry => new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));

    const sysData = this.bloodPressureData.map(entry => +entry.sys_blood_pressure);
    const diaData = this.bloodPressureData.map(entry => +entry.dia_blood_pressure);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Systolic Blood Pressure',
            data: sysData,
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.1)',
            tension: 0.4,
            fill: '-1',
          },
          {
            label: 'Diastolic Blood Pressure',
            data: diaData,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.1)',
            tension: 0.4,
            fill: '-1',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 40,
            suggestedMax: 200
          }
        }
      }
    });
  }
}

