import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public auth:AuthServiceService) { }

  ngOnInit(): void {
  }
  isLoading = false;

  sendMail(form: NgForm){

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.forgotPass(form.value)
  }

}
