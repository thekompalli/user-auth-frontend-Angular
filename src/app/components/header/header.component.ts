import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(public auth:AuthServiceService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.logout()
  }

}
