import { Component, ElementRef, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() messageAdded = new EventEmitter<Message>();
  currentSender = 'Riley';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, msgSubject, msgText, this.currentSender);
    this.messageAdded.emit(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
