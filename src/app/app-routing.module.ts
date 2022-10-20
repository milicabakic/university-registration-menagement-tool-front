import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './component/app.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: AppComponent
  },
  {
    path: "home",
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
