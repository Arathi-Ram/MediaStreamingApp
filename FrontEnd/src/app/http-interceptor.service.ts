import { Injectable , Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector
  ) { }
  intercept(req: HttpRequest<any>, next: any): Observable<HttpEvent<any>> {
    let _authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone(
      {
        setHeaders : {
          Authorization : `Bearer ${_authService.getToken()}`
        }
      }
    )
    return next.handle(tokenizedReq);
  }
}
