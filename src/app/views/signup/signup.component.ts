import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/libs/models/user';
import { UserService } from 'src/app/services/user.service';
import { takeUntil, catchError, take, throttle, throttleTime, debounce, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formSignUp!: FormGroup;

  public isEmailValid: boolean = false;
  public isPassValid: boolean = false;
  
  public confirmPassword!: string;

  // for unsubscribing to subscriptions on destroy
  private _unSub: Subject<boolean> = new Subject();  // subjects vs replay won't replay when reinitialize
  private unSub: Observable<boolean> = this._unSub.asObservable();

  public user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    status: '',
    isActive: '',
    userRole: '',
    enable: true
  };

  public nameFC = new FormControl(
    this.user.firstName, [
    Validators.required, Validators.minLength(4)
  ]);

  public lastNameFC = new FormControl(
    this.user.lastName, [
    Validators.required, Validators.minLength(4)
  ]);

  public phoneFC = new FormControl(
    this.user.phone, [
    Validators.required, Validators.pattern('[- +()0-9]+')
  ]);

  public emailFC = new FormControl(
    this.user.email, [
    Validators.required, Validators.email
  ]);

  public passwordFC = new FormControl(
    this.user.password, [
    Validators.required, Validators.minLength(6)
  ]);

  public confirmPasswordFC = new FormControl(
    this.confirmPassword, [
    Validators.required, Validators.minLength(6)
  ]);

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.nameFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.user.firstName = val; console.log(val) }
      );

    this.lastNameFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.user.lastName = val; console.log(val) }
      );

    this.phoneFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.user.phone = val; console.log(val) }
      );

    // every change will update the values
    this.emailFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.user.email = val; console.log(val) }
      );

    // every change will update the values
    this.passwordFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.user.password = val; console.log(val) }
      );

    this.confirmPasswordFC.valueChanges
      .pipe(takeUntil(this.unSub), debounceTime(1000))
      .subscribe((val: any) => { this.confirmPassword = val; console.log(val) }
      );

    this.formSignUp = new FormGroup({
      'name': this.nameFC,
      'lastName': this.lastNameFC,
      'phone': this.phoneFC,
      'email': this.emailFC,
      'password': this.passwordFC
    });

  }

  public createAccount(): void {
    

    // always subscribe when doing http request
    this.userService.addUser(this.formSignUp.value).subscribe(
      (response: User) => {
        console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }


}


