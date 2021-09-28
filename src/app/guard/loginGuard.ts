/*
    This guard class allows us to store cookies into the user's broswer
    The cookie will have the jwt token localhost:4200 
    The token will then be sent to the backend using authService where it will be validated to return a true or false
    Any fail validation will result in the users having to login to proceed into the desire pages.  Ex: home page
*/


import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
//import {ViewRoutes} from "../view-routes";
import {Injectable} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { AuthServiceService } from "../services/auth-service.service";
import { Observable, of, TimeoutError } from "rxjs";
import { catchError, map, timeout } from "rxjs/operators";


/**
 * Ensures before user is able to visit a view, at minimum a auth token needs to be present
 * or the user will auto get routed back to the login view.
 */
@Injectable()
export class BasicViewGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router, private cookie: CookieService, private http: HttpClient){

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.validatetoken()
    .pipe(
        map((v: boolean) => {
            if(v){
                console.log("Successful guard")
                return true;
            }else{
                //this.cookie.delete('token');
                this.router.navigate(["login"]);
                console.log("Failed Guard");
                return false;
            }
    }
    ), catchError((e:any) =>{
      this.router.navigate(["login"]);
      return of(false);
    }));

  }

  public validatetoken(): Observable<boolean>{

    let result: string = this.cookie.get('token')

    // check to make sure result is not null 
    if(result && result.length > 0){
        // send a post request to validate token on the the backend and send a true or false
        return this.authService.validateToken(result);
        
    }else{
        return of(false);
    }
    
  }

}