import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { pathToFileURL } from 'url';
import { BudgetComponent } from './budget/budget.component';
import { DashboardPage } from './dashboard.page';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';
import { TodoComponent } from './todo/todo.component';
import { TransactionComponent } from './transaction/transaction.component';

// console.log(AuthGuard)
const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      },
      {
        path: 'todo',
        component: TodoComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'stats',
        component: StatsComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'budget',
        component: BudgetComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'transactions',
        component: TransactionComponent,
        canActivate: [AuthGuard],

      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
