import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [new Document(1, 'Document Test', 'This is a test', 'someurl.com', 'child'),
                          new Document(2, 'A Document Test', 'This is another test', 'someurl.com', 'child')];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocumentEvent(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
