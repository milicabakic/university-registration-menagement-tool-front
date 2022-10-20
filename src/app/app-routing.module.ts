import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import {LoginComponent} from "./component/login/login.component";
import {SubjectsGroupsComponent} from "./component/subjects-groups/subjects-groups.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "upis",
    component: SubjectsGroupsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
