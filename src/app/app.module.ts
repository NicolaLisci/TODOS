import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { firebaseConfig} from './firebaseconfig';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {rootRouterConfig} from "./app.routes";
import {RouterModule} from "@angular/router";
import { AngularFireAuthModule } from 'angularfire2/auth';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "./core/auth.guard";
import {AuthService} from "./core/auth.service";
import {UserService} from "./core/user.service";
import {UserResolver} from "./user/user.resolver";
import {TodosComponent} from "./todos/todos.component";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
