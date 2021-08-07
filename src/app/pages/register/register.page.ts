import { LoaderService } from "./../../core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, User } from "src/app/core";
import { StorageService } from "src/app/core/services/storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    public router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private loader: LoaderService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // public navigateToHomeScreen() {
  //   this.router.navigate(["auth"]);
  // }

  public signUp(email, password, userName) {
    this.loader.showLoader();
    this.authService
      .RegisterUser(this.registerForm.controls["email"].value,
        this.registerForm.controls["password"].value)
      .then((res) => {
        // this.storageService.setItem('accessId' , res.idToken )
        const currentUser: User = {
          displayName: this.registerForm.controls["name"].value,
          email: this.registerForm.controls["email"].value,
          emailVerified: false,
        };
        console.log(currentUser, "currentUser");
        this.authService.SetUserData(currentUser).then((response) => {
          console.log(response, "set user data");
          this.loader.hideLoader();
          this.router.navigate(["dashboard"]);
        });
      })
      .catch((error) => {
        this.loader.hideLoader();
        window.alert(error.message);
      });
  }
}
