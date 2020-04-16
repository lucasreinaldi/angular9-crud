import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

// SERVIÇOS
import { UserService } from '@app/shared/services/user.service';

// MODELS
import { IUser } from '@app/shared/models/user.interface';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserFormBottomSheetComponent implements OnInit {

  title: string;
  saving = false;
  form: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'role'];

  role: any;
  roles = this.userService.getRoles();
  user: IUser;
  id: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<UserFormBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IUser
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      password: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(400)]],
      role: [null]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.id = +this.data;
      const user = this.userService.getUser(+this.id);
      this.form.patchValue(user);
      this.title = 'Editar Usuário';
    } else {
      this.title = 'Cadastrar Usuário';
    }
  }

  save() {
    if (this.form.invalid) {
      this.snackBar.open('Você deve preencher os campos obrigatórios', null, { duration: 3000 });
      return;
    }
    if (!this.form.dirty) {
      this.snackBar.open('Você deve fazer alguma alteração', null, { duration: 3000 });
      return;
    }
    const action = this.data ? 'Usuário editado com sucesso' : 'Usuário criado com sucesso';
    this.mapUser(this.id);
    this.userService.addUser(this.user);
    this.snackBar.open(action, null, { duration: 3000 });
    this.refresh();
  }

  refresh() {
    this.changeDetector.detectChanges();
    this.bottomSheetRef.dismiss();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  mapUser(id: number) {
    const formData = this.form.value;
    this.user = ({} as IUser);
    if (id) {
      this.userService.deleteUser(id);
      this.user.id = id;
    }
    Object.assign(this.user, formData);
  }

}
