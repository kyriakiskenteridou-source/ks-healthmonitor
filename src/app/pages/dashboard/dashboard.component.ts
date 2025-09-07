import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientCardComponent } from '../../shared/components/components/patient-card/patient-card.component';
import { DashboardService } from './dashboard.service';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../shared/models/patient.model';
import { PatientDataDialogComponent } from './patient-data-dialog/patient-data-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PatientCardComponent, PatientDataDialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public noPatients = 'No patients loaded yet';
  public patients: any;
  public currentPage: number = 0;
  public pageSize: number = 20;
  showPatientDialog = false;

  readonly dashboardService = inject(DashboardService);
  readonly patientService = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadPatients();
  }

  private loadPatients() {
    const offset = this.currentPage * this.pageSize;
    this.dashboardService.getPatients(this.pageSize, offset)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      console.log('loaded patients', data);
      this.patients = data;
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadPatients();
    this.noPatients = 'No more patients';
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPatients();
    }
  }

  selectPatient(patient: Patient) {
    this.patientService.setSelectedPatient(patient);
  }

  addPatientDialog() {
    this.showPatientDialog = true;
  }

  onCloseDialog() {
    this.showPatientDialog = false;
  }

  onPatientSave() {
    // initialize values
    this.currentPage = 0;
    this.pageSize = 20;
    this.loadPatients();
  }
}

