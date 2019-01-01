import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

const MODULES = [
    ThemeModule,
    HttpClientModule,
    NgJhipsterModule,
    FontAwesomeModule,
    NgbModule,
    NbDialogModule.forChild(),
  ];

@NgModule({
    imports: [...MODULES],
    exports: [ThemeModule, NgJhipsterModule, FontAwesomeModule, NgbModule, NbDialogModule]
})
export class SharedModule {
}
