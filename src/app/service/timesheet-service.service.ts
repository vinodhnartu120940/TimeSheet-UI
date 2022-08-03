import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timesheetmodels } from "../models/timesheetmodels"
@Injectable({
  providedIn: 'root'
})
export class TimesheetServiceService {

  constructor(public http: HttpClient) { }
  projectUrl: string = "https://localhost:7124/api/TimeSheets";
  projects: Timesheetmodels[] = [];


  saveProject() {
    return this.http.post(this.projectUrl, this.projects)
  }

  //get task details
  getTask() {
    return this.http.get(this.projectUrl)
  }

}
