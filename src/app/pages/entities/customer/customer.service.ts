import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from './customer.model';
import { SERVER_API_URL } from '../../../@core/utils/app.constants';
import { createRequestOption } from '../../../@core/utils/request-util';
import { NbAuthJWTToken, NbTokenService, NbAuthToken } from '@nebular/auth';

type EntityResponseType = HttpResponse<ICustomer>;
type EntityArrayResponseType = HttpResponse<ICustomer[]>;

@Injectable({ providedIn: 'root' })
export class CustomerService {
    public resourceUrl = SERVER_API_URL + 'api/customers';

    constructor(protected http: HttpClient) {}

    create(customer: ICustomer): Observable<EntityResponseType> {
        return this.http.post<ICustomer>(this.resourceUrl, customer, { observe: 'response' });
    }

    update(customer: ICustomer): Observable<EntityResponseType> {
        return this.http.put<ICustomer>(this.resourceUrl, customer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
