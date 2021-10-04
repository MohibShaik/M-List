import { StorageService } from './../../core/services/storage.service';
import { LoaderService } from "./../../core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService, User } from "src/app/core";
import { ModalController, ToastController } from "@ionic/angular";
import { ModalPage } from 'src/app/shared/pages/modal/modal.page';
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
    public modalCtrl: ModalController,
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
        this.openModal(response, 'success', 'Loggedin Successfully');
      }, (error) => {
        console.log(error);
        if (error.status !== 200) {
          this.openModal(error, 'failure', 'Ooops! your email and password do not match');
        }
      })
    }

  }

  async openModal(response, status: string, message: string) {
    const modalRef = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        status: status,
        response: response,
        message: message
      },
    });

    modalRef.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse?.data) {
        this.storageService.setItem('user', JSON.stringify(response));
        this.storageService.setItem('accessToken', response.accessToken);
        this.router.navigate(['dashboard'])
      }
      else {
        return;
      }
    });

    return await modalRef.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
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
