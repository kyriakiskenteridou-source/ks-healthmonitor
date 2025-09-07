import { ChangeDetectorRef, Component, DestroyRef, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { PatientDetailService } from '../patient-detail.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatientDetailedInfo } from '../../../shared/models/patient-detailed-info.model';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss'
})
export class PatientInfoComponent implements OnChanges {
  @Input() patientId: number = 0;

  details: PatientDetailedInfo | null = null;
  showMoreDetails = signal(false);

  private patientDetailService = inject(PatientDetailService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId) {
      this.patientDetailService.getPatientDetailedInfo(this.patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
          this.details = res[0];
        }
      );
    }
  }

  toggleDetails() {
    this.showMoreDetails.update(current => !current);
  }
}
