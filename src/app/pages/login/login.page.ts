import { StorageService } from './../../core/services/storage.service';
import { LoaderService } from "./../../core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService, User } from "src/app/core";
import { ToastController } from "@ionic/angular";
// import { Auth } from 'aws-amplify';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private loader: LoaderService,
    public toastController: ToastController,
    private storageService: StorageService,
  ) {
    this.createForm();
  }

  ngOnInit() { }

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
    if (this.loginForm.invalid) {
      // this.loader.hideLoader();
      return
    }

    else {
      this.authService.login(this.loginForm.value).subscribe(response => {
        console.log(response);
        this.presentToast('Woo hoo! lets enter the space', 'success');
        this.storageService.setItem('user', JSON.stringify(response));
        this.storageService.setItem('accessToken', response.accessToken);
        this.router.navigate(['dashboard'])
      }, (error) => {
        console.log(error);
        // this.loader.hideLoader();
        if (error.status === 400 || error.status === 404) {
          this.presentToast('Ooops! your email and password do not match', 'danger')
        }
      })
    }

  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  public navigateToRegister() {
    this.router.navigate(["/register"]);
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
