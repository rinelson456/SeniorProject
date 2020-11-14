import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  constructor(private http: HttpClient) { 
    this.maxContactId = this.getMaxId();
    this.getContacts();
  }

  getMaxId(): number {

    let maxId = 0

    for(let contact of this.contacts){
      let currentId = contact.id
        if(currentId > maxId){
          maxId = currentId
        }
    }
    return maxId
  }

  getContacts(): Contacts[] {
    this.http
      .get<Contacts[]>('https://wdd430cms.firebaseio.com/contacts.json').subscribe(
        // success method
        (contacts: Contacts[] ) => {
           this.contacts = contacts
           this.contactChangedEvent.next(this.contacts.slice())
        },
        // error method
        (error: any) => {
           console.log(error)
        });
    return this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).slice();
  }

  getContact(id: number): Contacts{
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
    this.storeContacts()
    }
    addContact(newContact: Contacts) {
      if(newContact === undefined){
        return
      }
      this.maxContactId++
      newContact.id = this.maxContactId
      this.contacts.push(newContact);
      const contactsListClone = this.contacts.slice()
      this.storeContacts()
    }
  
    updateContact(originalContact: Contacts, newContact: Contacts) {
      if(originalContact == undefined){
        return
      }
  
      const pos = this.contacts.indexOf(originalContact)
      if(pos < 0){
        return
      }

      console.log('here'+originalContact.id)
      newContact.id = originalContact.id
      this.contacts[newContact.id] = newContact
      const contactsListClone = this.contacts.slice()
      this.storeContacts()
    }

    storeContacts(){
      this.contactChangedEvent.next(this.contacts.slice())
      const contacts = JSON.stringify(this.contacts.slice());
  
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      this.http.put('https://wdd430cms.firebaseio.com/contacts.json', contacts, {headers: headers}).subscribe(
          () => {
            this.contactChangedEvent.next(this.contacts.slice())
          }
      );
    }
}
