import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AuthenticationResponse } from 'src/app/libs/models/AutheticationResponse';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public formLogin!: FormGroup;

  public email!: string;
  public password!: string;
  public loginFail: boolean = false;
  

  // for unsubscribing to subscriptions on destroy
  private _unSub: Subject<boolean> = new Subject();  // subjects vs replay won't replay when reinitialize
  private unSub: Observable<boolean> = this._unSub.asObservable();

  public emailFC = new FormControl(
    this.email, [
    Validators.required, Validators.minLength(4)
  ]);

  public passwordFC = new FormControl(
    this.password, [
    Validators.required, Validators.minLength(4)
  ]);

  constructor(private authService: AuthServiceService, private route: Router, private cookie: CookieService) { 
  }

  

  ngOnInit(): void {

    // every change will update the values
    this.emailFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.email = val; console.log(val) }
    );

    // every change will update the values
    this.passwordFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.password = val; console.log(val) }
      );

    // creating the FormGroup
    this.formLogin = new FormGroup({
      'email': this.emailFC,
      'password': this.passwordFC
    });
  }

  public getAuthService(): AuthServiceService{
    return this.authService;
  }


  //  NOTE: response: User instead of response: AuthenticationRequest
  public login(): void {
    //console.log(this.formLogin.value)
    // always subscribe when doing http request
    this.authService.testLogin(this.formLogin.value).subscribe(
      (response: AuthenticationResponse) => {
        console.log(response);

        // if login is successfull hide the element tag for login fail
        this.loginFail = false;
        this.authService.isLoggedIn = true;
        

        this.cookie.set("token", response.jwt);

        if(this.authService.isLoggedIn == true){
          this.route.navigate(['/home']);
        }
        //this.authService.setName(response.email);
        
    },
    (error: HttpErrorResponse) => {
      // if login gets http error that means
      // there is no email that matches its password 
      // show error
      this.loginFail = true;

      console.log(error.message);
      //console.log(this.formLogin.value)
    }
    );
  }



}
