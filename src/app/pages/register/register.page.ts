import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, User } from "src/app/core";
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(public router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit() { }

  public navigateToHomeScreen() {
    this.router.navigate(["auth"]);
  }

  public signUp(email, password, userName) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // this.storageService.setItem('accessId' , res.idToken )
        const currentUser: User = {
          displayName: userName.value,
          email: email.value,
          emailVerified: false
        }
        this.authService.SetUserData(currentUser).then((response) => {
          this.router.navigate(['dashboard']);
        })

      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
