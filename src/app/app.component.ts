import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }

  ToLoginPage () {
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

  Search(input: string) {
    let phrase = input.toLowerCase();
    let x = document.getElementsByClassName('post');

    for (let i = 0; i < x.length; i++) { 
      if (!x[i].firstElementChild?.innerHTML.toLowerCase().includes(phrase)) {
          (<HTMLElement>x[i]).style.display="none";
      }
      else {
        (<HTMLElement>x[i]).style.display="block";                 
      }
    }
  }

}
