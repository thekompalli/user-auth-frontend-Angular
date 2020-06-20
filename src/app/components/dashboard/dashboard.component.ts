import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isAuthenticated = false;
  private authListener:Subscription;
  name;
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    
    console.log("on"+ this.authService.getToken())
    this.authService.getAuthStatus().subscribe(
      authStatus =>{
        console.log(authStatus)
      }
    )
    this.name = this.authService.me;
    
  }

}
