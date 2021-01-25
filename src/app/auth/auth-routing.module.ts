import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EntryPageComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: EntryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
