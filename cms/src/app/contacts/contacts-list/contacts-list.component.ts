import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model'

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contacts[] = [new Contacts('R. Kent Jackson', 'jacksonk@byui.edu', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 1, 208-496-3771, null,),
                          new Contacts('Rex Barzee', 'barzeer@byui.edu', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', 2, 208-496-3768, null,)];


  constructor() { }

  ngOnInit(): void {
  }

}

