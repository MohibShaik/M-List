import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DashboardPageRoutingModule } from "./dashboard-routing.module";
import { DashboardPage } from "./dashboard.page";
import { TodoComponent } from "./todo/todo.component";
import { ProfileComponent } from "./profile/profile.component";
import { BudgetComponent } from "./budget/budget.component";
import { TaskCreationComponent } from "./todo/task-creation/task-creation.component";
import { DataService } from "src/app/core/services/data.service";
import { CalendarModule } from 'ion2-calendar';
import { TransactionComponent } from "./transaction/transaction.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    CalendarModule
  ],
  declarations: [
    DashboardPage,
    TodoComponent,
    ProfileComponent,
    BudgetComponent,
    TaskCreationComponent,
    TransactionComponent
  ],
  entryComponents: [TaskCreationComponent],
  providers: [DataService]
})
export class DashboardPageModule { }
