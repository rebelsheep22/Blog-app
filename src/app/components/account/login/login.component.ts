import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountServiceService } from 'src/services/account-service.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertsService: AlertService,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,9}$'
          ),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ],
      ],
    });
  }
  get email() {
    return this.loginForm.get(['email'])!.value;
  }
  get pwd() {
    return this.loginForm.get(['password'])!.value;
  }
  click() {
    this.router.navigate(['account/register']);
  }
  onSubmit() {
    this.submitted = true;

    this.alertsService.clear();

    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.pwd);
    this.loading = true;
    this.accountService
      .login(this.email, this.pwd)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
          console.log('error');
          this.alertsService.error(error);
          this.loading = false;
        },
      });
  }
}
