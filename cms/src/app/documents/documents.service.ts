import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) { 
    this.maxDocumentId = this.getMaxId();
    this.getDocument();
  }

  getContacts(): Document[] {
    return this.documents.slice();
  }

  getContact(id: string): Document{
    for(let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null
  }

  getDocument(){
    this.http
      .get<Document[]>('https://wdd430cms.firebaseio.com/documents.json').subscribe(
        // success method
        (documents: Document[] ) => {
           this.documents = documents
           this.maxDocumentId = this.getMaxId()
           this.documentChangedEvent.next(this.documents.slice())
        },
        // error method
        (error: any) => {
           console.log(error)
        });
}

  getDocuments(index: number){
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
  this.storeDocuments()
  }

  getMaxId(): number {

    let maxId = 0

    for(let document of this.documents){
      let currentId = parseInt(document.id)
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
    newDocument.id = this.maxDocumentId.toString()
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice()
    this.storeDocuments()
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument == undefined){
      return
    }

    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    const documentsListClone = this.documents.slice()
    this.storeDocuments()
  }

  storeDocuments(){
    this.documentChangedEvent.next(this.documents.slice())
    const documents = JSON.stringify(this.documents.slice());

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.put('https://wdd430cms.firebaseio.com/documents.json', documents, {headers: headers}).subscribe(
        () => {
          this.documentChangedEvent.next(this.documents.slice())
        }
    );
  }
}
