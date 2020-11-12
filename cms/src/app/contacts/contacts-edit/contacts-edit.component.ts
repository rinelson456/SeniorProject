import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contacts } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  id: number;
  editMode = false;
  contact: Contacts
  originalContact: Contacts;

  constructor(private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id =+params['id'];
      if (this.id == null){
        this.editMode = false;
        return
      }
      const index = this.id
      this.originalContact = this.contactService.getContact(index)
      if (this.originalContact == null){
        return
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      })
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const id = this.id;
    let group = null;
    const newContact = new Contacts(value.name, value.email, value.imageUrl, id, value.phone, group);
    console.log(this.editMode)
    if(this.editMode == true){
      this.contactService.updateContact(this.originalContact, newContact)
    } else{
      this.contactService.addContact(newContact);
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
