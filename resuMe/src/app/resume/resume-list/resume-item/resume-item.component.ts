import { Component, OnInit, Input } from '@angular/core';
import { Resume } from '../../resume.model'

@Component({
  selector: 'app-resume-item',
  templateUrl: './resume-item.component.html',
  styleUrls: ['./resume-item.component.css']
})
export class ResumeItemComponent implements OnInit {
  @Input() resume : Resume;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {

  }
}
