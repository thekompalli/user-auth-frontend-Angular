import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-auth';
  

  constructor(public auth:AuthServiceService){

  }

  ngOnInit(){
    this.auth.checkAuthUser()
  }
}
