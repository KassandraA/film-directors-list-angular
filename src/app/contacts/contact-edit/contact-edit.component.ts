import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ContactService } from '../contact.service';
import { identifyYearValidator } from '../../shared/yearValidate.directive';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.contactService.updateContact(this.id, this.contactForm.value);
      console.log('Updated: ', this.id, this.contactForm.value);
    } else {
      this.contactService.addContact(this.contactForm.value);
      console.log('Added: ', this.contactForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.contactForm.get('films')).controls;
  }

  onAddFilm() {
    (<FormArray>this.contactForm.get('films')).push(
      new FormGroup({
        filmTitle: new FormControl(null, Validators.required),
        year: new FormControl(null,
          [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteFilm(index: number) {
    (<FormArray>this.contactForm.get('films')).removeAt(index);
  }

  private initForm() {
    let contactId;
    let contactFirstName = '';
    let contactLastName = '';
    // tslint:disable-next-line:max-line-length
    let contactImagePath = 'https://www.freeiconspng.com/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category--9.png';
    let contactDateOfBirth = '';
    let contactDateOfDeath = '';
    let contactOccupation = '';
    let contactCountry = '';
    const contactFilms = new FormArray([]);

    if (this.editMode) {
      const contact = this.contactService.getContact(this.id);
      contactId = contact.id;
      contactFirstName = contact.firstName;
      contactLastName = contact.lastName;
      contactImagePath = contact.imagePath;
      contactDateOfBirth = contact.dateOfBirth ? new Date(contact.dateOfBirth).toISOString().substring(0, 10) : '';
      contactDateOfDeath = contact.dateOfDeath ? new Date(contact.dateOfDeath).toISOString().substring(0, 10) : '';
      contactOccupation = contact.occupation;
      contactCountry = contact.countryOfLiving;

      if (contact['films']) {
        for (const film of contact.films) {
          contactFilms.push(
            new FormGroup({
              filmTitle: new FormControl(film.filmTitle, Validators.required),
                year: new FormControl(film.year,
                  [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
            })
          );
        }
      }
    }

    this.contactForm = new FormGroup({
      id: new FormControl(contactId),
      firstName: new FormControl(contactFirstName, Validators.required),
      lastName: new FormControl(contactLastName, Validators.required),
      imagePath: new FormControl(contactImagePath),
      dateOfBirth: new FormControl(contactDateOfBirth),
      dateOfDeath: new FormControl(contactDateOfDeath),
      occupation: new FormControl(contactOccupation, Validators.required),
      countryOfLiving: new FormControl(contactCountry),
      films: contactFilms
    },
    { validators: identifyYearValidator });
  }

}
