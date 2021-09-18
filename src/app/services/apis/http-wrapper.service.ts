import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService<T> {

  constructor(private http: HttpClient) { }

  //this.http.post<User>(`${this.apiServerUrl}/api/v1/login`, user)

  // public post(uri: string, body: any = {}, httpOptions: HttpOptions = new HttpOptions(), timeout: number = 20000): Observable<T | HttpErrorContainer> {
  //   return this.postByLocation(this.apiVersion + uri, '', body, httpOptions, timeout);
  // }

  // public postByLocation(uri: string, location: string = '', body: any = null, options: HttpOptions = null, timeoutVal: number = 20000): Observable<T | HttpErrorContainer> {
  //   return this.httpClient
  //     .post<T>(location + uri, body, {params: options.params, headers: options.headers})
  //     .pipe(
  //       timeout(timeoutVal),
  //       map( (resp: T) => { return resp }),
  //       catchError(this.handleError)
  //     );
  // }
}
