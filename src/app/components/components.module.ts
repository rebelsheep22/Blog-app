import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { PostTemplateComponent } from './post-template/post-template.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [

    HomeComponent,
     PostTemplateComponent,
     PageHeaderComponent,
     CreatePostComponent
  ],
  imports: [
    CommonModule,
    AccountModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
