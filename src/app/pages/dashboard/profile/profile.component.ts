import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService, StorageService, User } from 'src/app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userData: User
  constructor(private authService: AuthService,
    private storage: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(this.storage.getItem('user'));
    console.log(this.userData , 'user data');
  }

  public logOut() {
    this.storage.clearStorage();
    this.router.navigate(['login'])
  }

}
