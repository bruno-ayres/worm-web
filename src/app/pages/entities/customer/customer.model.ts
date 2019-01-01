export interface ICustomer {
    id?: number;
    name?: string;
    active?: boolean;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public name?: string, public active?: boolean) {
        this.active = this.active || false;
    }
}
