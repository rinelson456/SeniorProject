import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  getDocument(index: number){
    return this.documents[index];
  }

  deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documents.splice(pos, 1);
  const documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {

    let maxId = 0

    for(let document of this.documents){
      let currentId = parseInt(document.dId)
        if(currentId > maxId){
          maxId = currentId
        }
    }
    return maxId
  }
  addDocument(newDocument: Document) {
    if(newDocument === undefined){
      return
    }
    this.maxDocumentId++
    newDocument.dId = this.maxDocumentId.toString()
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(documentsListClone)
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument == undefined){
      return
    }

    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }

    newDocument.dId = originalDocument.dId
    this.documents[pos] = newDocument
    const documentsListClone = this.documents.slice()
    this.documentChangedEvent.next(documentsListClone)
  }
}
