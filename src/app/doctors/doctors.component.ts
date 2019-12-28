import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post, Del } from './post.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  isDisplayable = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>('http://localhost:8080/doctors', postData)
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

  onClearPosts(id: Del) {
    // Send Http request
    this.http.delete('http://localhost:8080/doctors/' + id.id)
    .subscribe(responseData => {
      this.fetchPosts();
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Post }>('http://localhost:8080/doctors')
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
