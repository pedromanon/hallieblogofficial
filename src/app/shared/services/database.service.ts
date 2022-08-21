import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import Post from '../../models/post';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/Post';
  postsRef!: AngularFireList<Post>;
  constructor(private db: AngularFireDatabase) {
    this.postsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Post> {
    return this.postsRef;
  }
  create(post: Post): any {
    return this.postsRef.push(post);
  }
  update(key: string, value: any): Promise<void> {
    return this.postsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.postsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.postsRef.remove();
  }
}
