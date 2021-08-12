import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-task-creation",
  templateUrl: "./task-creation.component.html",
  styleUrls: ["./task-creation.component.scss"],
})
export class TaskCreationComponent implements OnInit {
  public taskCreationForm: FormGroup;
  tasksList: any;
  constructor(
    private modalCtr: ModalController,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.taskCreationForm = this.fb.group({
      title: ["", Validators.required],
      // priority: ["", Validators.required],
      // dueDate:["" , Validators.required],
      // title:["" , Validators.required],
    });
  }

  public priorityList = [
    { viewValue: "High", value: 1 },
    { viewValue: "Medium", value: 2 },
    { viewValue: "Low", value: 3 },
  ];

  ngOnInit() {
    let list = this.dataService.getTasksList();
    list.subscribe((x) => {
      console.log(x);
      this.tasksList = x;
    });
    console.log(list, "list");
  }
  async close() {
    // const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss();
  }

  public onSubmittingTask() {
    console.log(this.taskCreationForm.value);
    const data = {
      id: 2,
      title: "Daily Scrum Call - Solv",
      creationDate: "11/08/2021",
      dueDate: "30/08/2021",
      priority: "medium",
      status: "active",
    };
    this.dataService.createTask(data);
    this.modalCtr.dismiss();
  }
}
