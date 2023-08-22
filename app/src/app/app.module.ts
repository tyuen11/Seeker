import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StatusContainerComponent } from './components/status-container/status-container.component';
import { JobComponent } from './components/job/job.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from './core';
import { AddJobModalComponent } from './components/modals/add-job-modal/add-job-modal.component';

import { UserEffects } from './core/effects/user.effects';
import { TextfieldComponent } from './components/common/textfield/textfield.component';
import { DatetimePickerComponent } from './components/common/datetime-picker/datetime-picker.component';
import { JobEffects } from './core/effects/job.effects';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { AutocompleteComponent } from './components/common/autocomplete/autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusContainerComponent,
    JobComponent,
    AddJobModalComponent,
    TextfieldComponent,
    DatetimePickerComponent,
    ConfirmationModalComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    CoreModule,
    EffectsModule.forRoot([UserEffects, JobEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AutocompleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
