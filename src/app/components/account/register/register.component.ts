import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountServiceService } from 'src/services/account-service.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmPasswords } from '../ConfirmPasswords.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountServiceService,
    private alertsService: AlertService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      passwords: this.formBuilder.group(
        {
          password: [
            null,
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(30),
              Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
            ],
          ],
          repeatPassword: [null, Validators.required],
        },
        { validator: ConfirmPasswords('password', 'repeatPassword') }
      ),
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
    });
  }
  onSubmit(): void {
    console.log(this.registerForm.value);
    this.submitted = true;
    this.alertsService.clear();
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.accountService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertsService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertsService.error(error);
          this.loading = false;
        },
      });
  }
  backToLogin(): void {
    this.router.navigate(['account/login']);
  }
}
