import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from "@angular/common/http";
import { AuthServive } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authServive: AuthServive) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authServive.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modefiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });

        return next.handle(modefiedReq);
      })
    );
  }
}
