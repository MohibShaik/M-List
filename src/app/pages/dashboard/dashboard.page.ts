import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public accountOutlinedIcon = 'assets/icon/account/account.svg';
  public accountFilledIcon = 'assets/icon/account/account-filled-icon.svg';

  public homeOutlinedIcon = 'assets/icon/home/home-icon-outline.svg';
  public homefilledicon = 'assets/icon/home/home-icon-filled.svg';

  public homeIcon = this.homeOutlinedIcon;
  public accountIcon = this.accountOutlinedIcon;

  constructor() { }

  ngOnInit() {

  }

  public CurrentTab(event) {
    if (event.tab === 'home') {
      this.homeIcon = this.homefilledicon;
      this.accountIcon = this.accountOutlinedIcon;
    }
    else if (event.tab === 'account') {
      this.homeIcon = this.homeOutlinedIcon;
      this.accountIcon = this.accountFilledIcon;
    }
  }

}
