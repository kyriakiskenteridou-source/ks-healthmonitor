import { Component, Input } from '@angular/core';
import { Measurement } from '../../../shared/models/measurement.model';

@Component({
  selector: 'app-measurement-card',
  standalone: true,
  imports: [],
  templateUrl: './measurement-card.component.html',
  styleUrl: './measurement-card.component.scss'
})
export class MeasurementCardComponent {
  @Input() measurement!: Measurement;

  title: string = '';
  unit: string = '';
  color: string = 'blue';

  ngOnChanges() {
    switch (this.measurement?.key) {
      case 'heart_rate':
        this.title = 'Heart Rate';
        this.unit = 'bpm';
        // if (Number(this.measurement?.value) > 80) {
        //   this.color = 'red';
        // }
        break;
      case 'sys_blood_pressure':
        this.title = 'SYS Blood Pressure';
        this.unit = 'mm/Hg';
        // if (Number(this.measurement?.value) > 130) {
        //   this.color = 'red';
        // }
        break;
      case 'dia_blood_pressure':
        this.title = 'DIA Blood Pressure';
        this.unit = 'mm/Hg';
        if (Number(this.measurement?.value) > 70) {
          this.color = 'red';
        }
        break;
    }
  }
}
