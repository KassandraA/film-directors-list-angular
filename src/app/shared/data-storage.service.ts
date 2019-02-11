import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ContactService } from '../contacts/contact.service';
import { Contact } from '../contacts/contact.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor (private httpClient: HttpClient,
                private contactService: ContactService,
                private authService: AuthService) {}

    storeContacts() {
        const token = this.authService.getToken();
        return this.httpClient.put(
            'https://angular-project-ks.firebaseio.com/contacts.json',
            this.contactService.getContacts(),
            {
                observe: 'body',
                params: new HttpParams().set('auth', token)
            });
    }

    fetchContacts() {
        const token = this.authService.getToken();

        this.httpClient.get<Contact[]>(
            'https://angular-project-ks.firebaseio.com/contacts.json',
            {
            observe: 'body',
            responseType: 'json',
            params: new HttpParams().set('auth', token)
            }
        )
        .pipe(map(
            (contacts) => {
                for (const contact of contacts) {
                    if (!contact['films']) {
                        contact['films'] = [];
                    }
                }
                return contacts;
            }
        ))
        .subscribe(
            (contacts: Contact[]) => {
                this.contactService.setContacts(contacts);
            }
        );
    }
}
