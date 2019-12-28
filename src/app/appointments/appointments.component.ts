import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { DateObj, PostObj, GetObj, DeleteObj } from './post.model';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  loadedPosts: GetObj[] = [];
  isFetching = false;
  isDisplayable = false;
  alp: DateObj = {appointmentDate: new Date()};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostObj) {
    this.http
      .post<{ name: string }>(
        'http://localhost:8080/doctors/' + postData.doctorid +  '/patients/' + postData.patientid, postData
      )
      .subscribe(responseData => {
        this.fetchPosts();
        console.log(responseData);
      });
  }

  onFetchPosts() {
    if ( this.isDisplayable === false) { this.isDisplayable = true; }
    else { this.isDisplayable = false; }
    
    this.fetchPosts();
  }

  onClearPosts(id: DeleteObj) {
    this.http.delete('http://localhost:8080/appointments/' + id.id)
    .subscribe(responseData => {
      this.fetchPosts();
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: GetObj }>(
        'http://localhost:8080/appointments'
      )
      .pipe(
        map(responseData => {
          const postsArray: GetObj[] = [];
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
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }
}
