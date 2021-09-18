import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../libs/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public name!: string;

  private apiServerUrl = environment.apiBaseUrl;
  public isLoggedIn: boolean = false; // turn false when logged off

  constructor(private http: HttpClient) { }


  public login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/v1/login`, user);
  }

  public setName(name: string): void{
    this.name = name;
  }
}
