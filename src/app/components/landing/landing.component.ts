import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

import { DatabaseService } from '../../shared/services/database.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  posts: any;

  constructor(private postService: DatabaseService) {
      this.retrievePosts();
    }
  
  ngOnInit(): void {
    // this.retrievePosts();
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

}
