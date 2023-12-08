import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LoguinService } from 'src/app/services/auth/loguin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit ,OnDestroy{
  userloginOn: boolean = false;
  private loginService = inject(LoguinService);
  constructor() { }
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe;
  }
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userloginOn) => {
        this.userloginOn = userloginOn;
      }
    })
  }


}
