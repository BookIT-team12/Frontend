import {NgModule} from "@angular/core";
import {provideRouter, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./access-control-module/login/login.component";

const routes: Routes=[
  {path: "login", component: LoginComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
