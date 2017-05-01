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

  constructor(private blogPostsService: BlogPostsService) { }

  ngOnInit() {
    this.blogPostsService.getPosts().then(posts => { this.posts = posts});
  }
}
