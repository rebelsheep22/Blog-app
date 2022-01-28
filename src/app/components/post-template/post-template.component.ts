import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/models/post';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.scss'],
})
export class PostTemplateComponent implements OnInit {
  img: any;
  posts!: Post[];
  singlePost!: Post;
  imageURL!: string;
  title!: string;
  content!: string;
  description!: string;
  uploadDate!:string;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    let array = localStorage.getItem('postsArray');
    this.posts =  JSON.parse(localStorage.getItem("postsArray") as string);
  }
  addNewPost(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      disableClose: true,
      data: {},
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res.invalid) return;
      this.imageURL = res.imgURL.value;
      this.title = res.title.value;
      this.content = res.content.value;
      this.description = res.description.value;
      this.uploadDate = res.uploadDate.value;
      this.singlePost = {
        title: this.title,
        content: this.content,
        imgURL: this.imageURL,
        description: this.description,
        uploadDate: this.uploadDate
      };
      this.posts.push(this.singlePost);
      localStorage.setItem('postsArray', JSON.stringify(this.posts));
      console.log(this.imageURL);
    });
  }
}
