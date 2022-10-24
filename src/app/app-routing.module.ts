import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import {LoginComponent} from "./component/login/login.component";
import {SubjectsGroupsComponent} from "./component/subjects-groups/subjects-groups.component";
import {AcceptedRegistrationComponent} from "./component/accepted-registration/accepted-registration.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "pocetna",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "upis",
    component: SubjectsGroupsComponent
  },
  {
    path: "upis/prihvacen",
    component: AcceptedRegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
