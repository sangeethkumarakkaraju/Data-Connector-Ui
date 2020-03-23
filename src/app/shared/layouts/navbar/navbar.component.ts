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


  btnClick = function () {
    console.log('hi');
    this.router.navigate(['/data-connector']);
  };
  btnSignOut = function () {
    this.router.navigate(['/']);
  };
}
