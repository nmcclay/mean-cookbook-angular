import { Injectable } from '@angular/core';
import {BlogPost} from "./blog-post";
import {Http} from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogPostsService {
  private apiHostUrl = 'https://www.googleapis.com';
  private blogUrl = this.apiHostUrl + '/blogger/v3/blogs/7159470537406093899';
  private postsUrl = this.blogUrl + '/posts?key=' +
    environment.bloggerAPIKey;

  constructor(private http: Http) {}

  getPosts(): Promise<BlogPost[]> {
    return this.http.get(this.postsUrl)
      .toPromise()
      .then((response) => {
        let posts = response.json().items;
        console.log(posts);
        return posts as BlogPost[]
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
