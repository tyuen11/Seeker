import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment-timezone';
import { addJob } from 'src/app/core/store/job';
import { SeekerState } from 'src/app/core/store/reducers';
import { selectUserId } from 'src/app/core/store/user';
import { Job } from 'src/app/interfaces';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.css', '../../../app.component.css']
})
export class AddJobModalComponent implements OnInit {
  private status: string;
  private currentUser!: number;
  public job!: Job;
  public jobForm: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddJobModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { status: string, currentUser: number, job: Job },
    public formBuilder: FormBuilder,
    private store: Store<SeekerState>
  ) {
    this.status = data.status;
    this.currentUser = data.currentUser;
    this.loadJobData(data.job);
  }

  ngOnInit(): void {
    this.store.select(selectUserId);
  }

  loadJobData(job: Job): void {
    this.jobForm = {
      company: new FormControl(job?.companyName || '', [Validators.required]),
      jobTitle: new FormControl(job?.position || '', [Validators.required]),
      postUrl: new FormControl(job?.url || ''),
      dateApplied: new FormControl(job?.dateApplied || moment.tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm'))
    };
    !!job ? this.job = job : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let { company, jobTitle, dateApplied, postUrl } = this.jobForm;
    let job: Job = {
      companyName: company.value,
      position: jobTitle.value,
      dateApplied: dateApplied.value,
      status: this.status,
      url: postUrl.value,
      uid: this.currentUser
    };


    this.store.dispatch(addJob({ job: job }));
    this.dialogRef.close();
    this.dialogRef.beforeClosed().subscribe(() => this.jobForm = null);
  }
}
