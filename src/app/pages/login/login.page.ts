import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationForm } from 'src/app/models/forms/authentication-form.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public authenticationForm: AuthenticationForm = new AuthenticationForm();
  public authenticationError: String;
  public isLoggingIn: Boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  public authenticate(): void {
    if(this.isLoggingIn) return;

    this.authenticationError = '';
    this.authenticationForm.formGroup.markAllAsTouched();

    if(this.authenticationForm.formGroup.invalid) return;
    
    this.isLoggingIn = true;

    this.authService.authenticate(this.authenticationForm.username.value, this.authenticationForm.password.value).subscribe(
      (response) => {
        this.storageService.setAuthToken("AUTH_TOKEN").subscribe(() => {
          this.isLoggingIn = false;
          this.authenticationForm.formGroup.reset();
          this.router.navigate(['/ui']);        
        });
      },
      (error) => {
        this.isLoggingIn = false;
        this.authenticationForm.formGroup.reset();
        this.authenticationError = error;
      }
    )
  }

}
