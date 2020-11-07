import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacts } from '../contacts.model'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy{                              
  contacts: Contacts[] = [];
  private subscription: Subscription;
  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this. subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contacts[]) => {
        this.contacts = contacts;
        console.log(contacts)
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

