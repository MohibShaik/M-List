import { LoaderService } from "./../../core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService, User } from "src/app/core";
// import { Auth } from 'aws-amplify';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  public navigateToHomeScreen() {
    this.router.navigate(["auth"]);
  }

  get f() {
    return this.loginForm.controls;
  }
  public createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  public ValidateUser() {
    // this.loader.showLoader();
    this.authService
      .SignIn(
        this.loginForm.controls["email"].value,
        this.loginForm.controls["password"].value
      )
      .then((response) => {
        console.log(response);
        this.router.navigate(["dashboard"]);
        // this.loader.hideLoader();
      })
      .catch((error) => {
        console.log(error);
        // this.loader.hideLoader();
      });
  }

  public navigateToRegister(){
    this.router.navigate(["/register"]);
  }
}
