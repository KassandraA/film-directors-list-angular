import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactStartComponent } from './contact-start/contact-start.component';
import { AuthGuard } from '../auth/auth-guard.service';


const contactsRoutes: Routes = [
    { path: '', component: ContactsComponent, children: [
        { path: '', component: ContactStartComponent },
        { path: 'new', component: ContactEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: ContactDetailComponent },
        { path: ':id/edit', component: ContactEditComponent, canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contactsRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class ContactsRoutingModule {}
