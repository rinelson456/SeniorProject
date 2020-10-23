import { Component, Input, OnInit,} from '@angular/core';
import { Contacts } from '../../contacts.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contacts;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
