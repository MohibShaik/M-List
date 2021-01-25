import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [

  // path: '',
  // component: DashboardPage,
  // children: [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamPageModule)
  },
  {
    path: 'leaves',
    loadChildren: () => import('./leaves/leaves.module').then(m => m.LeavesPageModule)
  },
  {
    path: 'wfh',
    loadChildren: () => import('./wfh/wfh.module').then(m => m.WfhPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  }
  // ]

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
