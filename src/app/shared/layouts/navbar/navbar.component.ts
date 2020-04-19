import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { of, Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  visible: boolean;
  userprofile: string;
  activeButton: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        console.log(event);
        this.showToolbar(event.shownavbar); // show the toolbar?
      });
    if (localStorage.getItem('data')) {
      this.userprofile = localStorage.getItem('data')
    }
  }

  showToolbar(event) {
    if (event === false) {
      this.visible = false;
    } else if (event === true) {
      this.visible = true;
    } else {
      this.visible = this.visible;
    }
  }


  navigateToDatapoint() {
    // console.log('hi');
    this.router.navigate(['/data-point']);
  };

  btnSignOut = function () {
    this.router.navigate(['/']);
    localStorage.clear();
  };
  navigateToDataconnection() {
    this.router.navigate(['/data-connector'])
  }
  navigateToScheduler() {
    this.router.navigate(['/jobs-scheduler']);
  }
  navigateToJobhistory() {
    this.router.navigate(['/job-history']);

  }

  setActive(buttonName) {
    this.activeButton = buttonName;
  }
  isActive(buttonName) {
    return this.activeButton === buttonName;
  }
}
