import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss'],
})
export class EntryPageComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  public register(): void {
    this.router.navigateByUrl('register');
  }

  public login(): void {
    this.router.navigateByUrl('login');
  }
}
