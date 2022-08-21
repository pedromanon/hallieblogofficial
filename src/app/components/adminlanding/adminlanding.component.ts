import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlanding',
  templateUrl: './adminlanding.component.html',
  styleUrls: ['./adminlanding.component.scss']
})
export class AdminlandingComponent implements OnInit {

  posts: any;
  currentPost = null;
  currentIndex = -1;
  title = '';
  constructor(private postService: DatabaseService, public router: Router) { }
  ngOnInit(): void {
    this.retrievePosts();
  }
  refreshList(): void {
    this.currentPost = null;
    this.currentIndex = -1;
    this.retrievePosts();
  }
  retrievePosts(): void {
    this.postService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }
  setActivePost(post: any, index: any): void {
    this.currentPost = post;
    this.currentIndex = index;
  }
  removeAllPosts(): void {
    this.postService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  ToAddPostPage () {
    this.router.navigate(['add-post']);
  }

}
