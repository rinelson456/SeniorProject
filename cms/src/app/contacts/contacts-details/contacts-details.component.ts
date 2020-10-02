import { Component, Input, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model'

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
  @Input() contacts: Contacts;

  constructor() { }

  ngOnInit(): void {
  }

}
