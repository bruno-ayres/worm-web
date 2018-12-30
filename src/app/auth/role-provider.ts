import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable({ providedIn: 'root' })
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string[]> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
            if (!token.isValid()) {
                return ['ROLE_USER'];
            }
            const authorities: string = token.getPayload()['auth'];
            if (authorities.indexOf(',') >= 0) {
                const authorityList: string[] = authorities.split(',');
                return authorityList;
            }
            return [authorities];
        }),
      );
  }
}