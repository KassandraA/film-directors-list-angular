import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { Contact, Film } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
    contactsChanged = new Subject<Contact[]>();
    idDead: boolean;
    contactsJSON = '../../assets/contacts.json';

    constructor (private router: Router,
                private httpClient: HttpClient) {}

    private contacts: Contact[] = [];

    getContacts() {
        return this.contacts.slice();
    }

    loadContacts() {
        // if (this.contacts.length === 0) { // ?
            const contactList = [];
            this.httpClient.get<Contact[]>(this.contactsJSON)
                .pipe(map(
                    (contacts: Contact[]) => {
                        for (let contact of contacts) {
                            contact = new Contact(
                                contact.id,
                                contact.firstName,
                                contact.lastName,
                                contact.occupation,
                                contact.dateOfBirth,
                                contact.dateOfDeath,
                                contact.imagePath,
                                contact.countryOfLiving,
                                contact.films
                                );
                            contactList.push(contact);
                        }
                        contacts = contactList;
                        return contacts;
                    }
                ))
                .subscribe((contacts: Contact[]) => {
                    this.setContacts(contacts);
                });
        // }
        return this.contacts.slice();
    }

    getContact(index: number) {
        const result = this.contacts.find(contact => contact.id === +index);
        if (!result) {
            this.router.navigate(['contacts']);
            console.log('The contact not exists');
        } else {
            return result;
        }
    }

    addContact(contact: Contact) {
        contact.id = this.contacts.length + 1;
        contact = new Contact(
            contact.id,
            contact.firstName,
            contact.lastName,
            contact.occupation,
            contact.dateOfBirth,
            contact.dateOfDeath,
            contact.imagePath,
            contact.countryOfLiving,
            contact.films
            );
        this.contacts.push(contact);
        this.contactsChanged.next(this.contacts.slice());
    }

    updateContact(index: number, newContact: Contact) {
        const i = this.contacts.findIndex(contact => contact.id === +index);
        this.contacts[i] = newContact;
        this.contactsChanged.next(this.contacts.slice());
    }

    deleteContact(index: number) {
        this.contacts.splice(this.contacts.findIndex((contact) => contact.id === +index), 1);
        this.contactsChanged.next(this.contacts.slice());
    }

    setContacts(contacts: Contact[]) {
        this.contacts = contacts;
        this.contactsChanged.next(this.contacts.slice());
    }

    calculateAge(startDate: string, endDate: string) {
        const today = endDate === '' ? new Date() : new Date(endDate);
        const birthDate = new Date(startDate);
        const month = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
