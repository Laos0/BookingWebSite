import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/libs/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name!: string;
  public firstName!: string;

  constructor(private authService: AuthServiceService, private userService: UserService, private cookie: CookieService) { }

  ngOnInit(): void {
    //this.name = this.authService.name;

    this.userService.getUserDetails(this.cookie.get('token')).subscribe(
      (response: User) => {
        //console.log(response.firstName);
        this.firstName = response.firstName;
    },
    (error: HttpErrorResponse) => {

      console.log("NOT HITTING");
      //console.log(this.formLogin.value)
    }
    );

    if(this.firstName == null){
      this.firstName = "Guest";
    }else{
      console.log(this.firstName)
    }

  }

}
