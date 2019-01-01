import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out', data: { id: 'logout' } }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private analyticsService: AnalyticsService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        }

      });
    // this.userService.getUsers()
    //  .subscribe((users: any) => this.user = users.nick);

    this.menuService.onItemClick().subscribe((netitem: any) => {
        if (netitem && netitem.item && netitem.item.data && netitem.item.data.id && netitem.item.data.id === 'logout') {
          this.router.navigate(['auth/logout']);
        }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
