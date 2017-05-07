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
  private postsCache: { [token: string]: BlogPost[] } = { };

  constructor(private http: Http) {
  }

  getNextPage(): Promise<BlogPost[]> {
    return this.getPosts(this.nextPageToken);
  }

  addPostsToCache(token: string, posts: BlogPost[]) {
    this.postsCache[token] = posts;
    console.log(this.postsCache);
  }

  getPostsFromCache(token: string) {
    if (this.postsCache[token]) {
      return this.postsCache[token];
    }
  }

  getPosts(pageToken?: string): Promise<BlogPost[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', environment.bloggerAPIKey);
    if (pageToken) {
      let cachedPosts = this.getPostsFromCache(pageToken);
      if (cachedPosts) {
        return Promise.resolve(cachedPosts);
      } else {
        params.set('pageToken', pageToken);
      }
    }

    return this.http.get(this.postsUrl, {params: params})
      .toPromise()
      .then((response) => {
        let JSON = response.json();
        let posts = JSON.items;
        let token = JSON.nextPageToken;
        this.nextPageToken = token;
        this.addPostsToCache(token, posts);
        return posts as BlogPost[]
      })
      .catch(this.handleError);
  }

  getBlogMetadata(): Promise<number> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', environment.bloggerAPIKey);
    return this.http.get(this.blogUrl, {params: params})
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    let errorJSON = JSON.parse(error._body).error;
    console.error('An error occurred', errorJSON);
    return Promise.reject(errorJSON || error);
  }
}
