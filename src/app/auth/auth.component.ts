import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthServive } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthServive, private router: Router) {}

  ngOnInit(): void {}

  onHandleErrorModel() {
    this.error = null;
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLogin) {
      this.authService.logIn(email, password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(["/recipes"]);
        },
        (error) => {
          console.log(error);
          this.error = error.error.error.message;
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(["/recipes"]);
        },
        (error) => {
          console.log(error);
          this.error = error.error.error.message;
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}
