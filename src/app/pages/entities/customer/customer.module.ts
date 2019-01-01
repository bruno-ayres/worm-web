import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { CustomerComponent } from './customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRoutingModule } from './customer-routing.module';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerOutletComponent } from './customer-outlet.component';
import { CustomerUpdateComponent } from './customer-update.component';
import { CustomerDeleteDialogComponent } from './customer-delete-dialog.component';
import { NbWindowModule, NbDialogModule } from '@nebular/theme';

const components = [
    CustomerOutletComponent,
    CustomerComponent,
    CustomerUpdateComponent,
    CustomerDeleteDialogComponent
];

const ENTRY_COMPONENTS = [
  CustomerDeleteDialogComponent
];

const MODULES = [
  ThemeModule,
  CustomerRoutingModule,
  HttpClientModule,
  NgJhipsterModule,
  FontAwesomeModule,
  NgbModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
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
