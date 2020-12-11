import { Component, OnInit } from '@angular/core';
import { Resume } from './resume.model';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  selectedResume: Resume;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.resumeService.resumeSelectedEvent.subscribe(
      (resume: Resume) => {
        this.selectedResume = resume;
      }
    );
  }

}
