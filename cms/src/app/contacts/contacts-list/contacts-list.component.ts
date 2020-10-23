import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts.model'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {                              
  contacts: Contacts[] = [];

  constructor(private contactService: ContactsService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contacts[]) => {
        this.contacts = contacts;
      }
    );
  }

}

