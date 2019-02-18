import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.loadContacts();
    firebase.initializeApp({
      apiKey: 'AIzaSyDFoNuA74Oa3fea0Kn7KDOlcjgS5zqsjXs',
      authDomain: 'angular-project-ks.firebaseapp.com',
    });
  }
}
