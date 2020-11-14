import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  editMode = false;
  originalDocument: Document;
  document: Document;
  id: number;

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id =+params['id'];
      if (this.id == null){
        this.editMode = false;
        return
      }
      this.originalDocument = this.documentService.getDocuments(this.id)
      if (this.originalDocument == null){
        return
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const id = JSON.stringify(this.id)
    let children = 'none';
    const newDocument = new Document(id, value.name, value.description, value.url, children);

    if(this.editMode == true){
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else{
      this.documentService.addDocument(newDocument);
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
