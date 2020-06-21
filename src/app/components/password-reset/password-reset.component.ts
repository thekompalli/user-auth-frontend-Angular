import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(public auth:AuthServiceService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.auth.verifyForgot(this.activatedRoute.snapshot.params.token, this.activatedRoute.snapshot.params.email)
    .subscribe(user => {
      let createdTime = new Date(user['createdTime']);
      let currentTime = new Date();
      let timeDifference = Math.abs(createdTime.valueOf() - currentTime.valueOf())

      if (timeDifference > parseInt(user['expirationTime'])){
        alert('Reset Link is expired')
        this.router.navigate(["/forgot-password"])
      }
    }, err => {
      console.log(err.error.message)
      this.router.navigate(["/"])
    })

  }

  ngOnInit(): void {
  }
  isLoading = false;



  change(form: NgForm){

    if (form.invalid || form.value.password !== form.value.password_reset) {
      alert("Passwords not matched")
      return
    }
    this.isLoading = true;
    let obj = {"forgotToken": this.activatedRoute.snapshot.params.token, "password":form.value.password}

    this.auth.resetPass(obj);
  }

}
