import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { AuthServive } from "./auth/auth.service";
import { isPlatformBrowser } from "@angular/common";
import { browser } from "protractor";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServive,
    @Inject(PLATFORM_ID) private platformid
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformid)) {
      this.authService.autoLogin();
    }
  }
}
