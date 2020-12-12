import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Resume } from '../resume.model'
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {

  resumes: Resume;
  id: number;

  constructor(private resumeService: ResumeService,
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];
      // this.resumes.id = +params['id'];
      this.resumes = this.resumeService.retrieveResume(this.id);
    });
  }

  onEditResume(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    console.log('edit')
  }

  onDelete() {
    this.resumeService.deleteResume(this.resumes);
    this.router.navigate(['/resume'], {relativeTo: this.route});
 }

}
