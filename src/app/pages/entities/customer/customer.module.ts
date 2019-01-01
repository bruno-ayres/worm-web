import { NgModule } from '@angular/core';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerUpdateComponent } from './customer-update.component';
import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { JhiItemCountComponent } from 'ng-jhipster';

const components = [
    CustomerComponent,
    CustomerUpdateComponent,
    CustomerDeleteDialogComponent
  ];

const ENTRY_COMPONENTS = [
  CustomerDeleteDialogComponent,
  JhiItemCountComponent
];

const MODULES = [
  SharedModule,
  CustomerRoutingModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ]
})
export class CustomerModule { }
