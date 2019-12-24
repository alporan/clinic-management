import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { Routes, RouterModule } from '@angular/router';
import { PatientpanelComponent } from './patientpanel/patientpanel.component';

const appRoutes: Routes = [
  { path: 'admin/patients', component:  PatientsComponent },
  { path: 'admin/doctors', component:  DoctorsComponent },
  { path: 'admin/appointments', component:  AppointmentsComponent },
  { path: 'patient', component:  PatientpanelComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    AppointmentsComponent,
    PatientpanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
