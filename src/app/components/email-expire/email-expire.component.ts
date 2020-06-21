import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-expire',
  templateUrl: './email-expire.component.html',
  styleUrls: ['./email-expire.component.scss']
})
export class EmailExpireComponent implements OnInit {

  constructor(public auth:AuthServiceService) { }

  ngOnInit(): void {
  }
  isLoading = false;

  sendMail(form: NgForm){

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.resend(form.value)
  }

}
