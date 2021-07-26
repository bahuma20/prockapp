import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormioModule } from 'angular-material-formio';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';
import {AppRoutingModule} from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormStoreService} from './form-store.service';
import {AuthService} from './auth.service';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppConfigModule} from './app-config.module';
import {SyncComponent} from './sync/sync.component';
import {FormSubmissionsComponent} from './form-submissions/form-submissions.component';
import {MatTableModule} from '@angular/material/table';
import {FormSigningComponent} from './form-signing/form-signing.component';
import {FormEditComponent} from './form-edit/form-edit.component';
import {AufmassComponent} from './aufmass/aufmass.component';
import {AufmassPositionComponent} from './aufmass/aufmass-position/aufmass-position.component';
import { AufmassRowEditComponent } from './aufmass/aufmass-row-edit/aufmass-row-edit.component';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {ConnectionServiceOptions, ConnectionServiceOptionsToken} from './connection.service';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormDetailComponent,
    FormSubmissionsComponent,
    FormSigningComponent,
    FormEditComponent,
    LoginComponent,
    SyncComponent,
    AufmassComponent,
    AufmassPositionComponent,
    AufmassRowEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    AppConfigModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormStoreService,
    AuthService,
    {
      provide: ConnectionServiceOptionsToken,
      useValue: {
        enableHeartbeat: false,
      } as ConnectionServiceOptions
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AufmassComponent,
  ]
})
export class AppModule { }

registerLocaleData(localeDe);
