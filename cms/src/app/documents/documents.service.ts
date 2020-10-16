import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getContacts(): Document[] {
    return this.documents.slice();
  }

  getContact(id: string): Document{
    for(let document of this.documents){
      if(document.dId === id){
        return document;
      }
    }
    return null
  }
}
