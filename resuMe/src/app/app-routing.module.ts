import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { ResumeEditComponent } from './resume/resume-edit/resume-edit.component';
import { ResumeDetailsComponent } from './resume/resume-details/resume-details.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ScheduleComponent } from './schedule/schedule.component';


const appRoutes: Routes = [
    {path: '', redirectTo: '/resume', pathMatch: 'full'},
    {path: 'resume', component: ResumeComponent, children: [
        {path: 'new', component: ResumeEditComponent},
        {path: ':id', component: ResumeDetailsComponent},
        {path: ':id/edit', component: ResumeEditComponent},
    ]},
    {path: 'applications', component: ApplicationsComponent},
    {path: 'schedule', component:  ScheduleComponent},
];

@NgModule({
     imports: [RouterModule.forRoot(appRoutes)],
     exports: [RouterModule]   
})
export class AppRoutingModule{

}