import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/libs/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  // list of user's information
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public email!: string;
  public password!: string;

  constructor(private userService: UserService, private cookie: CookieService) { }

  ngOnInit(): void {

    // calling backend to retrieve the user's details
    // then set its fields 
    this.userService.getUserDetails(this.cookie.get('token')).subscribe(
      (response: User) => {
        //console.log(response);
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.phone = response.phone;
        this.email = response.email;
        this.password = response.password;
    },
    (error: HttpErrorResponse) => {

      console.log(error.message);
      //console.log(this.formLogin.value)
    }
    );
  }

}
