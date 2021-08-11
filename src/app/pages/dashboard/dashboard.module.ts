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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    DashboardPage,
    TodoComponent,
    ProfileComponent,
    BudgetComponent,
    TaskCreationComponent,
  ],
})
export class DashboardPageModule {}
