import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ShortUrlService } from './../../services/short-url.service';
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
  shortUrlData;
  isData = false;
  constructor(private authService: AuthServiceService, public surl:ShortUrlService, private router:Router) { }

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(
      authStatus =>{
        console.log(authStatus)
      }
    )
    this.name = this.authService.me;
    
  }


   getShrink(url: NgForm){
    if (url.invalid) {
      return;
    }
    console.log(url.value)
    this.surl.shrinkUrl(url.value)
    this.isData = true
  }

}
