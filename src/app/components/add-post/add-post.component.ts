import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import Post from '../../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: Post = new Post();
  submitted = false;
  constructor(private postService: DatabaseService, public router: Router) { }
  ngOnInit(): void {
  }
  savePost(): void {
    const now = new Date();
    this.post.date = now.toLocaleDateString();
    this.postService.create(this.post).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }
  newPost(): void {
    this.submitted = false;
    this.post = new Post();
  }
  ToAdminLanding(): void {
    this.router.navigate(['adminlanding'])
  }
}
