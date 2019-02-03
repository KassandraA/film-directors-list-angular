import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDFoNuA74Oa3fea0Kn7KDOlcjgS5zqsjXs',
      authDomain: 'angular-project-ks.firebaseapp.com',
    });
  }
}
