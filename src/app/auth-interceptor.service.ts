import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        // const modifyHeader = req.clone({
        //     headers: req.headers.set('hi', 'balvindar singh'),
        //     setHeaders: {
        //         'kaise': 'ho'
        //     }
        // })
        console.log(req.url);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })
        return next.handle(modifiedRequest);
    }
}