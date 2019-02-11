import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { Router, ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { ContactService } from '../contact.service';
import { AuthGuard } from '../../auth/auth-guard.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  contactsHeight = this.contactService.contactListFullHeight;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService,
              private auth: AuthGuard) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactsChanged
      .subscribe((contacts: Contact[]) => this.contacts = contacts);
    const anotherSubscription = this.contactService.changeHeight
      .subscribe(contactsHeight => this.contactsHeight = contactsHeight);
    this.subscription.add(anotherSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
