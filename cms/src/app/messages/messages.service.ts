import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messagesChanged = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for(let message of this.messages){
      if(message.mId === id){
        return message;
      }
    }
    return null
  }

  addMessage(messages: Message){
    this.messages.push(messages);
    this.messagesChanged.emit(this.messages.slice());
  }
}
