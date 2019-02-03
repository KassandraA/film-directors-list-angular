import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { ContactService } from '../contact.service';
import { AuthGuard } from 'src/app/auth/auth-guard.service';

export type TabType = 'info' | 'films';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  id: number;
  tab: TabType = 'info';

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

  ngOnInit() {}

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteContact() {
    this.contactService.deleteContact(this.id);
    this.router.navigate(['/contacts']);
  }

}
