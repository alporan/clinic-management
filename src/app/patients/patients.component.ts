import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post, Del } from './post.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  isDisplayable = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'http://localhost:8080/patients',
        postData
      )
      .subscribe(responseData => {
        this.fetchPosts();
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    if ( this.isDisplayable === false){
      this.isDisplayable = true;
    } 
    else {
      this.isDisplayable = false;
    }

    this.fetchPosts();
  }

  onClearPosts(id: Del) {
    // Send Http request
    this.http.delete('http://localhost:8080/patients/' + id.id)
    .subscribe(responseData => {
      this.fetchPosts();
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Post }>(
        'http://localhost:8080/patients'
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
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
