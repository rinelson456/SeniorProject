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

    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
        }
      );
    }
    addContact(contact: Contacts) {
      if(!contact){
        return
      }
          // make sure id of the new Contact is empty
          contact.id = 0;
  
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // add to database
          this.http.post<{ message: string, contact: Contacts }>('http://localhost:3000/contacts',
          contact,
            { headers: headers })
            .subscribe(
              (responseData) => {
                // add new contact to contacts
                this.contacts.push(responseData.contact);
              }
            );
    }
  
    updateContact(originalContact: Contacts, newContact: Contacts) {
      if (!originalContact || !newContact) {
        return;
      }
  
      const pos = this.contacts.findIndex(d => d.id === originalContact.id);
  
      if (pos < 0) {
        return;
      }
  
      // set the id of the new Contact to the id of the old Contact
      newContact.id = originalContact.id;
  
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // update database
      this.http.put('http://localhost:3000/contactss/' + originalContact.id,
        newContact, { headers: headers })
        .subscribe(
          (response: Response) => {
            this.contacts[pos] = newContact;
          }
        );
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
