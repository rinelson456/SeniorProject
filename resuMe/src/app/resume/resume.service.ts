import {  Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Resume } from './resume.model';
import { stringify } from 'querystring';

@Injectable()
export class ResumeService {
    resumeChanged = new Subject<Resume[]>();
    private resumes: Resume[] = [];
    resumeSelectedEvent = new EventEmitter<Resume>();
    maxResumeId: number;

    constructor(private http: HttpClient) {
        this.maxResumeId = this.getMaxId();
        this.getResumes();
    }

    getMaxId(): number {

        let maxId = 0
    
        for(let resume of this.resumes){
          let currentId = resume.id
            if(currentId > maxId){
              maxId = currentId
            }
        }
        return maxId
      }

      getResumes(): Resume[] {
        this.http
          .get<Resume[]>('http://localhost:3000/resumes').subscribe(
            // success method
            (resumes: Resume[] ) => {
              const resume = JSON.stringify(resumes);
               this.resumes = JSON.parse(resume)
               this.resumeChanged.next(this.resumes.slice())
            },
            // error method
            (error: any) => {
               console.log(error)
            });
        return this.resumes.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).slice();
      }
    
      getResume(id: number): Resume{
        for(let resume of this.resumes){
          if(resume.id === id){
            return resume;
          }
        }
        return null
      }
    
      retrieveResume(index: number){
        return this.resumes[index];
      }
    
      deleteResume(resume: Resume) {
        if (!resume) {
          return;
        }
    
        const pos = this.resumes.findIndex(c => c.id === resume.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/resumes' + resume.id)
          .subscribe(
            (response: Response) => {
              this.resumes.splice(pos, 1);
            }
          );
        }
        addResume(resume: Resume) {
          if(!resume){
            return
          }
              // make sure id of the new Resume is empty
              resume.id = 0;
      
              const headers = new HttpHeaders({'Content-Type': 'application/json'});
          
              // add to database
              this.http.post<{ message: string, resume: Resume }>('http://localhost:3000/resumes',
              resume,
                { headers: headers })
                .subscribe(
                  (responseData) => {
                    // add new resume to resumes
                    this.resumes.push(responseData.resume);
                  }
                );
        }
      
        updateResume(originalResume: Resume, newResume: Resume) {
          if (!originalResume || !newResume) {
            return;
          }
      
          const pos = this.resumes.findIndex(d => d.id === originalResume.id);
      
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Resume to the id of the old Resume
          newResume.id = originalResume.id;
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/resumes' + originalResume.id,
            newResume, { headers: headers })
            .subscribe(
              (response: Response) => {
                this.resumes[pos] = newResume;
              }
            );
        }
    
        storeResumes(){
          this.resumeChanged.next(this.resumes.slice())
          const resumes = JSON.stringify(this.resumes.slice());
      
          const headers = new HttpHeaders();
          headers.set('Content-Type', 'application/json; charset=utf-8');
          this.http.put('http://localhost:3000/resumes', resumes, {headers: headers}).subscribe(
              () => {
                this.resumeChanged.next(this.resumes.slice())
              }
          );
        }
    }
