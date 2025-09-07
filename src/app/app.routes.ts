import { Routes } from '@angular/router';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'patient-detail/:id', component: PatientDetailComponent },  
];
