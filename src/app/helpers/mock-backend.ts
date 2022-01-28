import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Users } from 'src/models/users';


const usersKey = 'blog-registration-module';
let users = JSON.parse(localStorage.getItem(usersKey)!) || [];
console.log(users)
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url,method,headers,body} = req;
    return handleRoute();
    function handleRoute() {
      if (url.endsWith('/users/authenticate') && method === 'POST'){
        return authenticate();
      }
      else if (url.endsWith('/users/register') && method === 'POST'){
        return register();
      }
    }
    function authenticate() {
      const { email, password } = body;
      const user = users.find((x:Users) => x.email === email && x.passwords.password === password);
       if (!user) return error('Username or password is incorrect');
       return ok({
          ...basicDetails(user),
           token: 'fake-jwt-token'
       })
  }
  function basicDetails(user: { id: any; username: any; firstName: any; lastName: any; }) {
    const { id, username, firstName, lastName } = user;
    return { id, username, firstName, lastName };
}
    function register() {
      const user = body

      if (users.find((x: { email: string; }) => x.email === user.email)) {
          return error('Email "' + user.email + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return <any>ok();
  }
        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }
        function isLoggedIn() {
          return headers.get('Authorization') === 'Bearer fake-jwt-token';
      }
      function error(message: string) {
        return throwError({ error: { message } })
            .pipe(materialize(), delay(500), dematerialize());
    }
  }

}
export const mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true
};
