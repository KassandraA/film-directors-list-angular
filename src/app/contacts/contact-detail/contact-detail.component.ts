import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContactService } from '../contact.service';
import { AuthGuard } from '../../auth/auth-guard.service';

export type TabType = 'info' | 'films';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  id: number;
  tab: TabType = 'info';
  authenticated = this.auth;

  get showInfoTab() {
    return this.tab === 'info';
  }

  get showFilmsTab() {
    return this.tab === 'films';
  }

  toggleTab(type: TabType) {
    this.tab = type;
  }

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthGuard) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
    this.contactService.changeContactsHeight(false);
  }

  ngOnDestroy() {
    this.contactService.changeContactsHeight(true);
  }

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteContact() {
    this.contactService.deleteContact(this.id);
    this.router.navigate(['/contacts']);
  }

}
