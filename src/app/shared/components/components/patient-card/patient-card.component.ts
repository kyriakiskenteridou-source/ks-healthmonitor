import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-card',
  standalone: true,
  imports: [],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss'
})
export class PatientCardComponent {
  @Input() patient: any;
}
