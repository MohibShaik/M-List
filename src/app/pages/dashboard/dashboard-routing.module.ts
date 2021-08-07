import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { BudgetComponent } from './budget/budget.component';
import { DashboardPage } from './dashboard.page';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      },
      {
        path: 'todo',
        component: TodoComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'budget',
        component: BudgetComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
