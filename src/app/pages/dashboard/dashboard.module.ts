import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    ThemeModule, AgGridModule.withComponents([])
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
