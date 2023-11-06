import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postservice: PostServiceService) {}

  ngOnInit(): void {}
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      alert('Invalid!');
      return;
    }
    alert(
      postForm.value.enteredDepartment + ':' + postForm.value.enteredContent
    );

    this.postservice.addPost_service(
      postForm.value.enteredDepartment,
      postForm.value.enteredContent
    );
    postForm.resetForm;
  }
}
