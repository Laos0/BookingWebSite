import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name!: string;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.name = this.authService.name;

    if(this.name == null){
      this.name = "Guest";
    }
  }

}
