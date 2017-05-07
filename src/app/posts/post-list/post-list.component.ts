import { Component, OnInit } from '@angular/core';
import {BlogPostsService} from "../blog-posts.service";
import {BlogPost} from "../blog-post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: BlogPost[];
  private loadingPosts:boolean = false;

  constructor(private blogPostsService: BlogPostsService) { }

  ngOnInit() {
    this.blogPostsService.getPosts().then(posts => { this.posts = posts});
  }

  loadMorePosts() {
    if (!this.loadingPosts) {
      this.loadingPosts = true;
      this.blogPostsService.getNextPage().then(posts => {
        this.posts = this.posts.concat(posts);
        this.loadingPosts = false;
      });
    }
  }
}
