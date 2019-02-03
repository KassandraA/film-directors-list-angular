import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { Contact, Film } from './contact.model';

@Injectable()
export class ContactService {
    contactsChanged = new Subject<Contact[]>();
    idDead: boolean;

    constructor (private router: Router) {}

    private contacts: Contact[] = [
        new Contact(
            1,
            'Guillermo',
            'del Toro',
            'Film director, screenwriter, producer, novelist',
            '1964/10/09',
            '',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Guillermo_del_Toro_in_2017.jpg/1280px-Guillermo_del_Toro_in_2017.jpgg',
            'USA, Canada',
            [
                new Film ('Cronos', 1993),
                new Film ('Mimic', 1997),
                new Film ('The Devil\'s Backbone', 2001),
                new Film ('Blade II', 2002),
                new Film ('Hellboy', 2004),
                new Film ('Pan\'s Labyrinth', 2006),
                new Film ('Hellboy II\: The Golden Army', 2008),
                new Film ('Pacific Rim', 2013),
                new Film ('Crimson Peak', 2015),
                new Film ('The Shape of Water', 2017)
        ]
        ),
        new Contact(
            2,
            'Alfonso',
            'Cuarón',
            'Director, screenwriter, producer, editor',
            '1961/11/28',
            '',
            'https://upload.wikimedia.org/wikipedia/commons/0/00/Alfonso_Cuar%C3%B3n_%282013%29_cropped.jpg',
            'England',
            [
                new Film ('Sólo con Tu Pareja', 1991),
                new Film ('A Little Princess', 1995),
                new Film ('Great Expectations', 1998),
                new Film ('Y Tu Mamá También', 2001),
                new Film ('Harry Potter and the Prisoner of Azkaban', 2004),
                new Film ('Children of Men', 2006),
                new Film ('Gravity', 2013),
                new Film ('Roma', 2018)
            ]
        ),
        new Contact(
            3,
            'Federico',
            'Fellini',
            'Filmmaker',
            '1920/01/20',
            '1993/10/31',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Federico_Fellini_NYWTS_2.jpg/1920px-Federico_Fellini_NYWTS_2.jpg',
            'Italy',
            [
                new Film ('La Strada', 1954),
                new Film ('Nights of Cabiria', 1957),
                new Film ('La Dolce Vita', 1960),
                new Film ('8½', 1963),
                new Film ('Amarcord', 1973)
            ]
        ),
        new Contact(
            4,
            'Steven Allan',
            'Spielberg',
            'Film producer, film director, screenwriter',
            '1946/12/18',
            '',
            'https://upload.wikimedia.org/wikipedia/commons/5/5d/Steven_Spielberg_Cannes_2013_3.jpg',
            'USA',
            [
                new Film ('The Terminal', 2004),
                new Film ('War of the Worlds', 2005),
                new Film ('Munich', 2005),
                new Film ('Indiana Jones and the Kingdom of the Crystal Skull', 2008),
                new Film ('The Adventures of Tintin', 2011),
                new Film ('War Horse', 2011),
                new Film ('Lincoln', 2012),
                new Film ('Bridge of Spies', 2015),
                new Film ('The BFG', 2016),
                new Film ('The Post', 2017),
                new Film ('Ready Player One', 2018)
            ]
        ),
    ];

    getContacts() {
        return this.contacts.slice();
    }

    getContact(index: number) {
        const result = this.contacts.find(contact => contact.id === +index);
        if (!result) {
            this.router.navigate(['contacts']);
            console.log('Not exist');
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
        this.contacts.splice(this.contacts.findIndex(contact => contact.id === +index), 1);
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

    setContacts(contacts: Contact[]) {
        this.contacts = contacts;
        this.contactsChanged.next(this.contacts.slice());
    }

}
