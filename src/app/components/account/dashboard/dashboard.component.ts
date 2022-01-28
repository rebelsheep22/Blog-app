import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/services/account-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private accountService: AccountServiceService, private router : Router) {
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
  }
  }
}
