import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LoguinService } from 'src/app/services/auth/loguin.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userloginOn: boolean = false;
  userData?: User;
  private loginService = inject(LoguinService);
  constructor() { }
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLogin) => {
        this.userloginOn = userLogin;
      }
    })
    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    })
  }
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe;
    this.loginService.currentUserData.unsubscribe;
  }

}
