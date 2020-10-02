import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [new Message(1, 'Test', 'This is a test', 'Jackson'),
  new Message(2, 'ATest', 'AThis is a test', 'AJackson')];;

  constructor() { }

  ngOnInit(): void {
  }

  onMessageAdded(message : Message){
    this.messages.push(message);
  }

}
