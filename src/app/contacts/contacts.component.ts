import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
