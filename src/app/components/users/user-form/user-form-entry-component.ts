import { UserFormBottomSheetComponent } from '@app/components/users/user-form/user-form.component';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheetConfig, MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})

export class UserFormEntryComponent {

  subscribe1: Subscription;
  id: number;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.open();
  }

  open() {
    this.subscribe1 = this.route.params.subscribe(
      (params: any) => {
        this.id = params.id ? params.id : null;
        const config: MatBottomSheetConfig = {
          panelClass: 'bottom-sheet-container',
          data: this.id
        };

        const sheetRef = this.bottomSheet.open(UserFormBottomSheetComponent, config);

        sheetRef.afterDismissed().subscribe(result => {
          this.router.navigate(['../'], { relativeTo: this.route });
        });
      }
    );
  }
}
