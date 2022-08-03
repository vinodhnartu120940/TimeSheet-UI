import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TimesheetServiceService } from '../service/timesheet-service.service';

@Component({
  selector: 'app-timesheetcontent',
  templateUrl: './timesheetcontent.component.html',
  styleUrls: ['./timesheetcontent.component.css'],
})
export class TimesheetcontentComponent implements OnInit {
  taskData: FormGroup;

  //get task in database
  project: any;

  startDate: any;
  x: any = 0;
  isDisabled = false;
  taskView:boolean=true;







  constructor(public fb: FormBuilder, public service: TimesheetServiceService) {

    this.taskData = this.fb.group({
      //create a itemrows control in formgroup
      date: ['00-00-0000'],
      empId: ['120941'],
      empName: ["Mahesh"],

      itemRows: this.fb.array([this.initItemRow()]),
    });
    // this.getTasts();



  }
  //save Project details



  ngOnInit(): void { }
  get itemRows() {
    return this.taskData.get('itemRows') as FormArray;
  }
  // hurs = this.taskData.value['itemRows'][0].startTime;

  initItemRow() {
    return this.fb.group({
      projectName: [''],
      activity: [''],
      task: [''],
      hours: ['']

    });
  }
  addForm() {
    debugger;

    this.itemRows.push(this.initItemRow());


  }
  disabledInput(i: number) {
    console.log(i)
    this.isDisabled = true;
  }

  removeForm(i: number) {

    if (this.itemRows.length > 1) {
      this.inputValues1(i);
      this.itemRows.removeAt(i);

    }
  }
  getTasts(SelectedDate:any) {
    //debugger
    this.taskView=false;
    this.service.getTask(this.taskData.value['empId'],SelectedDate.value).subscribe(data => {
      this.project = data;
    })
  }
  //removeSubmitAlert
  removeSubmitAlert(){
    this.submitAlert=false;
  }
  submitAlert: boolean = false;
  saveTask() {
    let projectData: any = {
      employeeID: this.taskData.value['empId'],
      employeeName: this.taskData.value['empName'],
      date: this.taskData.value['date'],
      projectName: this.taskData.value['itemRows'][0].projectName,
      activity: this.taskData.value['itemRows'][0].activity,
      task: this.taskData.value['itemRows'][0].task,
      workHours: this.taskData.value['itemRows'][0].hours,
    }

    this.service.projects = projectData;
    this.service.saveProject().subscribe(res => {
      console.log("the task is succesfully created");
      this.submitAlert= true;
      // this.getTasts();
    })
    console.log(this.taskData.value)


    // console.log(this.service.projects)


    // console.log(this.itemRows.length)
    // console.log('time difference' +)
  }
  //for view task

  disableButton() {
    let value = true;
  }

  inputValues(id: any) {
    debugger;
    for (let i = id; i <= id; i++) {

      this.x = this.x + this.taskData.value["itemRows"][i].hours;

    }
    console.log(this.x)

    // let y = this.taskData.value["itemRows"][id].hours + x;

  }
  inputValues1(id: any) {

    let y = this.x;
    // for (let i = id; i <= id; i++) {

    //   y = y - this.taskData.value["itemRows"][i].hours;

    // }
    this.x = y - this.taskData.value["itemRows"][id].hours;

    console.log(this.x)

    // let y = this.taskData.value["itemRows"][id].hours + x;

  }

  // viewData(){
  //   this.service.getTask(this.taskData.value['empId']).subscribe(data => {
  //     this.project = data;
  //   })
  // }


}
