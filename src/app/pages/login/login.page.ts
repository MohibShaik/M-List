import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, user } from 'src/app/core';
// import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  constructor(public router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {

  }

  public navigateToHomeScreen() {
    this.router.navigate(['auth']);
  }


  public createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ValidateUser() {
    this.authService.signUser(this.loginForm.value).subscribe((response: user) => {
      console.log(response);
      if (response) {
        this.router.navigate(['dashboard']);
      }
    })
  }

}


