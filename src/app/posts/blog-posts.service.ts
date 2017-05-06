import { Injectable } from '@angular/core';
import {BlogPost} from "./blog-post";
import {Http, URLSearchParams} from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogPostsService {
  private apiHostUrl = 'https://www.googleapis.com';
  private blogUrl = this.apiHostUrl + '/blogger/v3/blogs/7159470537406093899';
  private postsUrl = this.blogUrl + '/posts';
  private nextPageToken: string;

  constructor(private http: Http) {
  }

  getNextPage(): Promise<BlogPost[]> {
    return this.getPosts(this.nextPageToken);
  }

  getPosts(pageToken?: string): Promise<BlogPost[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', environment.bloggerAPIKey);
    if (pageToken) params.set('pageToken', pageToken);

    return this.http.get(this.postsUrl, {params: params})
      .toPromise()
      .then((response) => {
        let postJSON = response.json();
        this.nextPageToken = postJSON.nextPageToken;
        return postJSON.items as BlogPost[]
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
