import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormioModule } from 'angular-material-formio';
import 'hammerjs';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
