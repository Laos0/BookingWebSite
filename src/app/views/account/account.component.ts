import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
