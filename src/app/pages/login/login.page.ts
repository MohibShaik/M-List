import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  constructor(public router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.signIn();
  }

  public navigateToHomeScreen() {
    this.router.navigate(['auth']);
  }



  async signIn() {
    try {
      const user = await Auth.signIn('mohib.shaik16@gmail.com', 'Mohib123@');
    } catch (error) {
      console.log('error signing in', error);
    }
  }


  public createForm() {
  this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
}

  public ValidateUser() {
  this.router.navigate(['dashboard']);
}



}


