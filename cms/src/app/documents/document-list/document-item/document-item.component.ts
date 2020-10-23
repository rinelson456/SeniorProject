import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../../../documents/document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
