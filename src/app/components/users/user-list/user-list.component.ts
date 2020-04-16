import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

// MODELS
import { IUser } from '@app/shared/models/user.interface';

// COMPONENTES
import { UserService } from '@app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.usersDataSource.sort = sort;
  }

  @ViewChild(MatPaginator, { static: false }) set content2(paginator: MatPaginator) {
    this.usersDataSource.paginator = paginator;
  }

  title = 'ANGULAR CRUD';
  isLoading = true;
  form: FormGroup;

  lgColumns = ['name', 'email', 'actions'];
  xsColumns = ['name', 'actions'];
  columns = this.lgColumns;

  subscribe1: Subscription;
  subscribe2: Subscription;

  users: IUser[] = this.userService.getUsers();
  usersDataSource: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private media: MediaObserver
  ) {
  }

  ngOnInit() {
    this.subscribe1 = this.media.asObservable()
      .subscribe((change: MediaChange[]) => {
        if (change[0].mqAlias === 'xs')
          this.columns = this.xsColumns;
        else if (change[0].mqAlias === 'sm')
          this.columns = this.xsColumns;
        else
          this.columns = this.lgColumns;
        this.changeDetector.markForCheck();
      });

    this.usersDataSource = new MatTableDataSource(this.users);
    this.subscribe2 = this.userService.addUserEvent.subscribe(
      (users: IUser[]) => {
        this.usersDataSource.data = users;
      }
    );
    this.isLoading = false;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy() {
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
  }

  add() {
    this.router.navigate(['add']);
  }

  edit(id: number) {
    this.router.navigate(['edit', id]);
  }

  delete(id: number) {
    this.userService.deleteUser(id);
    this.snackBar.open('Usuário removido', null, { duration: 3000 });
  }
}
