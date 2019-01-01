import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { CustomerOutletComponent } from './customer-outlet.component';
import { CustomerUpdateComponent } from './customer-update.component';
import { ICustomer, Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerResolve implements Resolve<ICustomer> {
    constructor(private service: CustomerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Customer>) => response.ok),
                map((customer: HttpResponse<Customer>) => customer.body)
            );
        }
        return of(new Customer());
    }
}


const routes: Routes = [{
  path: '',
  component: CustomerOutletComponent,
  children: [
    {
        path: 'main',
        component: CustomerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'wormApp.customer.home.title'
        }
    },
    {
        path: ':id/edit',
        component: CustomerUpdateComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wormApp.customer.home.title'
        },
    },
    {
        path: 'new',
        component: CustomerUpdateComponent,
        resolve: {
            customer: CustomerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wormApp.customer.home.title'
        }
    },
    {
      path: '',
      redirectTo: 'main',
      pathMatch: 'full',
    },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
