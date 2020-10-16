import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Input() message: Message;
  currentSender = '1';
  id = '1';

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(this.id, msgSubject, msgText, this.currentSender );
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
