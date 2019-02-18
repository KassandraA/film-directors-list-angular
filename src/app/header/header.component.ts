import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  getUser() {
    return this.authService.getUser();
  }

  onSaveData() {
    this.dataStorageService.storeContacts()
      .subscribe(
        (response) => {
          console.log('onSaveData:', response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.fetchContacts();
  }
}
