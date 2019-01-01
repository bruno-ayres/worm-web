import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer.model';

@Component({
    selector: 'ngx-customer-delete-dialog',
    templateUrl: 'customer-delete-dialog.component.html',
    styleUrls: ['customer-delete-dialog.component.scss'],
})
export class CustomerDeleteDialogComponent {

    @Input() title: string;

    @Input() customer: ICustomer;

    constructor(protected ref: NbDialogRef<CustomerDeleteDialogComponent>,
                protected customerService: CustomerService) {
    }

    clear() {
        this.ref.close(false);
    }

    confirmDelete() {
        this.customerService.delete(this.customer.id).subscribe(response => {
            this.ref.close(true);
        });
    }

}
