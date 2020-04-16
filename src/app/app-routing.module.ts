import { UserFormEntryComponent } from './components/users/user-form/user-form-entry-component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// CORE
import { AuthGuard } from '@app/shared/auth/guards/auth.guard';

// COMPONENTS
import { UserListComponent } from '@app/components/users/user-list/user-list.component';
import { UserFormBottomSheetComponent } from '@app/components/users/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent, children:
    [
      { path: 'add', component: UserFormEntryComponent },
      { path: 'edit/:id', component: UserFormEntryComponent },
    ] },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
