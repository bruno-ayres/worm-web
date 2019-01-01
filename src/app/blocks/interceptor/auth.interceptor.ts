import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { SERVER_API_URL } from '../../@core/utils/app.constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private token: string = null;

    constructor(private authService: NbAuthService) {
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            this.token = token.getValue();
          } else {
            this.token = null;
          }
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request);
        }
        if (!!this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.token
                }
            });
        }
        return next.handle(request);
    }
}
