import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FormObj, Person, Appointment, Appointment2 } from './post.model';


@Component({
  selector: 'app-patientpanel',
  templateUrl: './patientpanel.component.html',
  styleUrls: ['./patientpanel.component.css']
})
export class PatientpanelComponent implements OnInit {
  patientData: Person = {name: '', surname: '' };
  loadedPatients: Person[] = [];

  loadedDoctors: Person[] = [];
  isFetchingDoctors = false;

  patientid: number;
  appointmentid: number;
  loadedAppointments: Appointment[] = [];
  isFetchingAppointments = false;
  isDisplayable = false;
  isDisplayable2 = false;
  patientid2: number;
  appointmentid2: number;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctors();
    this.fetchPatients();
  }

  onCreatePost(postData: FormObj) {
    this.patientData.name = postData.name;
    this.patientData.surname = postData.surname;

    this.http.post<{ name: string }>('http://localhost:8080/patients',this.patientData)
      .subscribe(responseData => {
        this.fetchPatients();
        console.log(responseData);
      });

    setTimeout(
      () => {
        this.loadedPatients.forEach (
          (element) => {
            if (element.name === this.patientData.name && element.surname === this.patientData.surname ) {
              this.patientData.id = element.id;
            }
          });
        this.http
          .post<{ name: string }>(
            'http://localhost:8080/doctors/' + postData.id +  '/patients/' + this.patientData.id, postData
          )
          .subscribe(responseData => {
            this.FetchAppointments();
            console.log(responseData);
          });
        setTimeout(
            () => {
                this.loadedAppointments.forEach (
                  (element) => {
                    if (element.patient.id === this.patientData.id) {
                      this.appointmentid2 = element.id;
                    }
                  });
            this.patientid2 = this.patientData.id;
            this.isDisplayable2 = true;}, 1000);
      }, 1000);

  }

  onFetchAppointment(temp: Appointment2) {
    this.patientid = temp.patientid;
    this.appointmentid = temp.id;
    if ( this.isDisplayable === false) {
      this.isDisplayable = true;
    } else {
      this.isDisplayable = false;
    }
    this.FetchAppointments();
  }

  private fetchDoctors() {
    this.isFetchingDoctors = true;
    this.http
      .get<{ [key: string]: Person }>( 'http://localhost:8080/doctors' )
      .pipe(
        map(responseData => {
          const doctorsArray: Person[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              doctorsArray.push({ ...responseData[key]});
            }
          }
          return doctorsArray;
        })
      )
      .subscribe(doctors => {
        this.isFetchingDoctors = false;
        this.loadedDoctors = doctors;
      });
  }

  private fetchPatients() {
    this.http
      .get<{ [key: string]: Person }>( 'http://localhost:8080/patients' )
      .pipe(
        map(responseData => {
          const doctorsArray: Person[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              doctorsArray.push({ ...responseData[key]});
            }
          }
          return doctorsArray;
        })
      )
      .subscribe(patients => {
        this.loadedPatients = patients;
      });
  }

  private FetchAppointments() {
    this.isFetchingAppointments = true;
    this.http
      .get<{ [key: string]: Appointment }>(
        'http://localhost:8080/appointments'
      )
      .pipe(
        map(responseData => {
          const postsArray: Appointment[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              console.log(key);
              console.log(responseData[key]);
              postsArray.push({ ...responseData[key]});
            }
          }
          return postsArray;
        })
      )
      .subscribe(appointments => {
        this.isFetchingAppointments = false;
        this.loadedAppointments = appointments;
      });
  }
}
