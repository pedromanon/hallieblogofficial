import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import Post from 'src/app/models/post';

import { Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() post!: Post;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPost!: Post | any;
  message = '';
  constructor(private postService: DatabaseService, public router: Router) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentPost = { ...this.post };
  }
  updatePost(): void {
    const data = {
      title: this.currentPost!.title,
      body: this.currentPost!.body
    };
    this.postService.update(this.currentPost!.key, data)
      .then(() => this.message = 'The post was updated successfully!')
      .catch(err => console.log(err));
      
    window.location.reload();
  }
  deletePost(): void {
    this.postService.delete(this.currentPost!.key)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The post was deleted successfully!';
      })
      .catch(err => console.log(err));
    
    window.location.reload();
  }
  ToAdminLanding(): void {
    window.location.reload();
  }
}
