import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";

import { Observable } from "rxjs";
import { AuthServive } from "./auth.service";
import { map, take } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthServive,
    private router: Router,
    @Inject(PLATFORM_ID) private platformid
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (!isAuth && isPlatformBrowser(this.platformid)) {
          const newUser = JSON.parse(localStorage.getItem("userData"));
          if (newUser) {
            return true;
          }
          return this.router.createUrlTree(["/auth"]);
        }
        return true;
      })
    );
  }
}
