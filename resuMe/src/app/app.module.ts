import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResumeComponent } from './resume/resume.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppRoutingModule } from './app-routing.module';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';
import { ResumeEditComponent } from './resume/resume-edit/resume-edit.component';
import { ResumeDetailsComponent } from './resume/resume-details/resume-details.component';
import { ResumeItemComponent } from './resume/resume-list/resume-item/resume-item.component';
import { ResumeService } from './resume/resume.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HeaderComponent,
    ApplicationsComponent,
    ScheduleComponent,
    ResumeListComponent,
    ResumeEditComponent,
    ResumeDetailsComponent,
    ResumeItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ ResumeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
