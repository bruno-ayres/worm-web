import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';

const COMPONENTS = [
  EntitiesComponent
];

const ENTRY_COMPONENTS = [
];

@NgModule({
  imports: [
    ThemeModule,
    EntitiesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class EntitiesModule { }
