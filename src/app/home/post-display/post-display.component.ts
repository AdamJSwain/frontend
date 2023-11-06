import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
  posts: { _id: string; department: string; content: string; __v: string }[] =
    [];

  constructor(public postservice: PostServiceService) {}

  private postsubscription!: Subscription;

  ngOnInit(): void {
    this.postservice.getPost_Service();
    this.postsubscription = this.postservice.getUpdateListener().subscribe(
      (
        posts: {
          _id: string;
          department: string;
          content: string;
          __v: string;
        }[]
      ) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postsubscription.unsubscribe();
  }

  ondelete(postId: string) {
    this.postservice.deletePost_Service(postId);
  }
}
