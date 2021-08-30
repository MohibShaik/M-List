import { LoaderService } from "./../../core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, User } from "src/app/core";
import { StorageService } from "src/app/core/services/storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

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
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      gender: ["", Validators.required],
      password: ["", Validators.required],
      mobileNumber: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  public signUp() {
    if (this.registerForm.invalid) {
      return
    }

    else {
      this.authService.createNewUser(this.registerForm.value).subscribe(response => {
        console.log(response);
        this.presentToast('Thanks! your account has been successfully created.', 'success');
        this.router.navigate(['login'])
      }, (error) => {
        console.log(error);

        if (error.status === 400) {
          this.presentToast('User already exists', 'danger')
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

  public isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
