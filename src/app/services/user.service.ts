/*
  A User service class that calls the backend apis for user basic functionalities
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiEndPoints } from '../libs/models/ApiEndPoints';
import { User } from '../libs/models/user';
import { UserDetails } from '../libs/models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // ApiEndPoints.BASEURL = http://localhost:8080
  // ApiEndPoints.USER = http://localhost:8080/api/v1/users


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    //return this.http.get<User[]>(ApiEndPoints.USER + '/all');
    return this.http.get<User[]>(`${ApiEndPoints.BASEURL}/api/v1/users/all`);
  }

  public addUser(user: User): Observable<User> {
    //return this.http.post<User>(this.baseUrl + ApiEndPoints.USER + '/add', user);
    //console.log(ApiEndPoints.USER + '/add');
    return this.http.post<User>(ApiEndPoints.USER + '/add', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(ApiEndPoints.USER + '/update', user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${ApiEndPoints.BASEURL}/api/v1/users/delete/${userId}`);
  }

  public getUserDetails(token: string): Observable<User> {
    //return this.http.get<User[]>(ApiEndPoints.USER + '/all');
    return this.http.post<User>(`http://localhost:8080/api/v1/user/details`, token);
  }

}
 