import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({ providedIn: 'root' })
export class AfterLoginService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.checkAuth();
  }

  canActivateChild(): boolean | UrlTree {
    return this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) return true;
    return this.router.createUrlTree(['/login']);
  }
}
