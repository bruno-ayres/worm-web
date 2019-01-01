import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { CustomerService } from './customer.service';
import { ICustomer } from './customer.model';
import { ITEMS_PER_PAGE } from '../../../@core/utils/app.constants';
import { NbDialogService } from '@nebular/theme';
import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';

@Component({
  selector: 'ngx-customer',
  styleUrls: ['./customer.component.scss'],
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit, OnDestroy {
  currentAccount: any;
  customers: ICustomer[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected customerService: CustomerService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private dialogService: NbDialogService
) {
      this.itemsPerPage = ITEMS_PER_PAGE;
      this.routeData = this.activatedRoute.data.subscribe(data => {
          this.page = data.pagingParams.page;
          this.previousPage = data.pagingParams.page;
          this.reverse = data.pagingParams.ascending;
          this.predicate = data.pagingParams.predicate;
      });
  }

  loadAll() {
        this.customerService
        .query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        })
        .subscribe(
            (res: HttpResponse<ICustomer[]>) => this.paginateCustomers(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
  }

  loadPage(page: number) {
      if (page !== this.previousPage) {
          this.previousPage = page;
          this.transition();
      }
  }

  delete(customer: ICustomer) {
    this.dialogService.open(CustomerDeleteDialogComponent, {
        context: {
          title: 'Deseja apagar registro?',
          customer: customer
        },
      }).onClose.subscribe((result: any) => {
          if (result) {
            this.loadAll();
          }
      });
  }

  transition() {
      this.router.navigate(['/pages/customer'], {
          queryParams: {
              page: this.page,
              size: this.itemsPerPage,
              sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
          }
      });
      this.loadAll();
  }

  clear() {
      this.page = 0;
      this.router.navigate([
          '/pages/customer',
          {
              page: this.page,
              sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
          }
      ]);
      this.loadAll();
  }

  ngOnInit() {
      this.loadAll();
  }

  ngOnDestroy() {
  }

  trackId(index: number, item: ICustomer) {
      return item.id;
  }

  sort() {
      const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
      if (this.predicate !== 'id') {
          result.push('id');
      }
      return result;
  }

  protected paginateCustomers(data: ICustomer[], headers: HttpHeaders) {
      this.links = this.parseLinks.parse(headers.get('link'));
      this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
      this.queryCount = this.totalItems;
      this.customers = data;
  }

  protected onError(errorMessage: string) {
  }
}
