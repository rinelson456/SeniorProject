import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contacts } from '../contacts.model'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
  contacts: Contacts;
  id: number;

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];
      this.contacts = this.contactsService.retrieveContact(this.id);
    });

  }
  onEditContact(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.contactsService.deleteContact(this.contacts);
    this.router.navigate(['contacts'], {relativeTo: this.route});
 }

}
