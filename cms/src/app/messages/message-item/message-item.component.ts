import { Component, OnInit, Input } from '@angular/core';
import { Contacts } from 'src/app/contacts/contacts.model';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string;
  @Input() message: Message;

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    const contact: Contacts = this.contactService.getContact(this.message.sender);
      this.messageSender = contact.name;

  }

}
