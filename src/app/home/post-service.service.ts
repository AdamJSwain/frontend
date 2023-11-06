import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private postsdisplay: {
    _id: string;
    department: string;
    content: string;
    __v: string;
  }[] = [];
  private updatedpostsdisplay = new Subject<
    { _id: string; department: string; content: string; __v: string }[]
  >();

  constructor(private http: HttpClient) {}

  addPost_service(pdepartment: string, pcontent: string) {
    this.http
      .post('https://localhost:3000/api/posts', {
        department: pdepartment,
        content: pcontent,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPost_Service() {
    this.http
      .get<{ message: string; posts: any }>('https://localhost:3000/api/posts')
      .subscribe((thePost) => {
        this.postsdisplay = thePost.posts;
        this.updatedpostsdisplay.next([...this.postsdisplay]);
      });
  }

  deletePost_Service(postid: string) {
    this.http
      .delete('https://localhost:3000/api/posts/' + postid)
      .subscribe(() => {
        const updatedpostsdeleted = this.postsdisplay.filter(
          (post) => post._id !== postid
        );
        this.postsdisplay = updatedpostsdeleted;
        this.updatedpostsdisplay.next([...this.postsdisplay]);
      });
  }

  getUpdateListener() {
    return this.updatedpostsdisplay.asObservable();
  }
}
