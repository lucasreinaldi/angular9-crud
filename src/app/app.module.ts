import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

// MODULES
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from '@app/app.component';

// SERVICES
import { AuthService } from '@app/shared/auth/auth.service';
import { UserService } from '@app/shared/services/user.service';

// COMPONENTS
import { UserListComponent } from '@app/components/users/user-list/user-list.component';
import { UserFormBottomSheetComponent } from '@app/components/users/user-form/user-form.component';
import { UserFormEntryComponent } from './components/users/user-form/user-form-entry-component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MainNavComponent } from './shared/layout/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,

    UserFormBottomSheetComponent,
    UserListComponent,
    UserFormEntryComponent,
    MainNavComponent,
  ],
  entryComponents: [
    UserFormBottomSheetComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ScrollingModule,
    MatSortModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
