import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contacts } from '../contacts.model'

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contacts>();                              
  contacts: Contacts[] = [new Contacts('R. Kent Jackson', 'jacksonk@byui.edu', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 1, 2084963771, null,),
                          new Contacts('Rex Barzee', 'barzeer@byui.edu', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', 2, 2084963768, null,)];


  constructor() { }

  ngOnInit(): void {
  }
  
  onContactSelected(contact: Contacts){
    this.contactWasSelected.emit(contact);
  }

}

