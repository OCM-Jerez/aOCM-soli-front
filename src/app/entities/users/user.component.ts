import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

// import { NgbModal } from '@ng-/ng-bootstrap';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// import { JhiEventManager } from 'ng-jhipster';

// import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
// import { AccountService } from 'app/core/auth/account.service';
// import { Account } from 'app/core/user/account.model';
// import { UserService } from 'app/core/user/user.service';
// import { User } from 'app/core/user/user.model';
// import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { AccountService } from 'src/app/entities/account/account.service';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  users: IUser[] | null = null;
  userListSubscription?: Subscription;
  totalItems = 0;
  // itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private eventManager: JhiEventManager,
    // private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.data
    //   .pipe(
    //     // flatMap esta deprecado.
    //     flatMap(
    //       () => this.accountService.identity(),
    //       (data, account) => {
    //         this.page = data.pagingParams.page;
    //         this.previousPage = data.pagingParams.page;
    //         this.ascending = data.pagingParams.ascending;
    //         this.predicate = data.pagingParams.predicate;
    //         this.currentAccount = account;
            this.loadAll();
    //         // this.userListSubscription = this.eventManager.subscribe('userListModification', () => this.loadAll());
    //       }
    //     )
    //   )
    //   .subscribe();
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      // this.eventManager.destroy(this.userListSubscription);
    }
  }

  setActive(user: IUser, isActivated: boolean): void {
    // this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(index: number, item: IUser): any {
    return item.id;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  deleteUser(user: IUser): void {
    // const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.user = user;
  }

  private loadAll(): void {
    this.userService.query().
    subscribe( resp =>{
    console.log(resp);
    this.users = resp
    console.log(this.users[1]);
    });
  }

  // private sort(): string[] {
  //   const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
  //   if (this.predicate !== 'id') {
  //     result.push('id');
  //   }
  //   return result;
  // }

  // private onSuccess(users: IUser[] | null, headers: HttpHeaders): void {
  //   this.totalItems = Number(headers.get('X-Total-Count'));
  //   this.users = users;
  // }
}
