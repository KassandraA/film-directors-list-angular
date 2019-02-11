import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ContactService } from '../../contact.service';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-films',
  templateUrl: './contact-films.component.html',
  styleUrls: ['./contact-films.component.css']
})
export class ContactFilmsComponent implements OnInit {
  contact: Contact;
  id: number;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

}
