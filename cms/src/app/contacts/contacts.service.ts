import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contacts } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactChangedEvent = new Subject<Contacts[]>();
  maxContactId: number;


  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contacts[] {
    return this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).slice();
  }

  getContact(id: string): Contacts{
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
    return null
  }

  retrieveContact(index: number){
    return this.contacts[index];
  }

  deleteContact(contact: Contacts) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice()
    this.contactChangedEvent.next(contactsListClone);
    }
    addContact(newContact: Contacts) {
      if(newContact === undefined){
        return
      }
      this.maxContactId++
      newContact.id = this.maxContactId.toString()
      this.contacts.push(newContact);
      const contactsListClone = this.contacts.slice()
      this.contactChangedEvent.next(contactsListClone)
    }
  
    updateContact(originalContact: Contacts, newContact: Contacts) {
      if(originalContact == undefined){
        return
      }
  
      const pos = this.contacts.indexOf(originalContact)
      if(pos < 0){
        return
      }
  
      newContact.id = originalContact.id
      this.contacts[pos] = newContact
      const contactsListClone = this.contacts.slice()
      this.contactChangedEvent.next(contactsListClone)
    }
}
