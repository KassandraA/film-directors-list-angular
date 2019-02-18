import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts-list/contact-item/contact-item.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactInfoComponent } from './contact-detail/contact-info/contact-info.component';
import { ContactFilmsComponent } from './contact-detail/contact-films/contact-films.component';
import { ContactStartComponent } from './contact-start/contact-start.component';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactDetailComponent,
        ContactEditComponent,
        ContactItemComponent,
        ContactsListComponent,
        ContactInfoComponent,
        ContactFilmsComponent,
        ContactStartComponent
    ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        ReactiveFormsModule,
    ],
})
export class ContactsModule {}
