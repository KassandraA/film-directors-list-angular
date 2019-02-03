import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFilmsComponent } from './contact-films.component';

describe('ContactFilmsComponent', () => {
  let component: ContactFilmsComponent;
  let fixture: ComponentFixture<ContactFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
