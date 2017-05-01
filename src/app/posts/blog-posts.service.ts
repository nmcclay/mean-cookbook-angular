import { Injectable } from '@angular/core';
import {BlogPost} from "./blog-post";

export const POSTS: BlogPost[] = [
  new BlogPost('How data-binding works', "coming soon..."),
  new BlogPost('What\'s the deal with directives?', "coming soon..."),
  new BlogPost('Cha-cha-ng-ges...', "coming soon..."),
  new BlogPost('Components & services', "coming soon..."),
  new BlogPost('Express.js in a nutshell', "coming soon..."),
  new BlogPost('Hu-MONGO-ous DB', "coming soon..."),
  new BlogPost('Component Style Secrets', "coming soon..."),
  new BlogPost('Angular Deployment', "coming soon..."),
  new BlogPost('Internationalization Tips', "coming soon..."),
];

@Injectable()
export class BlogPostsService {
  getPosts(): Promise<BlogPost[]> {
    return Promise.resolve(POSTS);
  }
}
