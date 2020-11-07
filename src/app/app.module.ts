import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormioModule } from 'angular-material-formio';
import 'hammerjs';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MatSidenavModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {FormStoreService} from './form-store.service';
import {AuthService} from './auth.service';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    FormStoreService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
