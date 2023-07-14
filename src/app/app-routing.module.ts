import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './detailview/detailview.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavComponent } from './nav/nav.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NoteViewComponent } from '.././app/note-view/note-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { CanActivateGuard } from './services/can-activate.guard';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"reg",component:RegistrationComponent},
  {path:"nav",component:NavComponent},
  {path:"noteadd",component:NoteAddComponent,canActivate:[CanActivateGuard]},
  {path:"noteview",component:NoteViewComponent,canActivate:[CanActivateGuard]},
  {path:"logout",component:LogoutComponent},
  {path:"detail/:id",component:DetailViewComponent},
  {path:"**",component:PageNotFoundComponent} //keep this always last to avoid the flow interruption
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
