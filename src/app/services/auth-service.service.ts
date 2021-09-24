import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../libs/models/AuthenticationRequest';
import { AuthenticationResponse } from '../libs/models/AutheticationResponse';
import { User } from '../libs/models/user';
import { HttpWrapperService } from './apis/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public name!: string;

  private apiServerUrl = environment.apiBaseUrl;
  public isLoggedIn: boolean = false; // turn false when logged off

  public headers = {'Authorization': 'application/json'};


  constructor(private http: HttpClient, private httpWrapper: HttpWrapperService<User>) { }


  public login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/v1/login`, user);
    //return this.httpWrapper.post()
  }

  public testLogin(auth: AuthenticationResponse): Observable<AuthenticationResponse> {
    return this.http.post<any>(`${this.apiServerUrl}/api/v1/testLogin`, auth);
    //return this.httpWrapper.post()
  }

  public validateToken(token: String): Observable<boolean>{
    return this.http.post<any>(`${this.apiServerUrl}/auth`, token);
  }

  // TODO: implement a logout method
  public logout(): void{

  }

  public setName(name: string): void{
    this.name = name;
  }
}
