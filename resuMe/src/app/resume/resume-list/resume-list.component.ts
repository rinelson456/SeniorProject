import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Resume } from '../resume.model'
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit, OnDestroy{
  resumes: Resume[];
  private subscription: Subscription;

  constructor(private resumeService: ResumeService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.resumes = this.resumeService.getResumes();
    this.subscription = this.resumeService.resumeChanged.subscribe(
      (resumes: Resume[]) => {
        this.resumes = resumes;
      }
    )
    this.resumes = this.resumeService.getResumes();
  }

  onNewResume(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
