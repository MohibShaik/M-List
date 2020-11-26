import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  LoginComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  EntryPageComponent,
} from "./index";

const routes: Routes = [
  {
    path: "",
    component: EntryPageComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "signUp",
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
