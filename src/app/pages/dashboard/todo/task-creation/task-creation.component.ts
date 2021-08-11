import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-task-creation",
  templateUrl: "./task-creation.component.html",
  styleUrls: ["./task-creation.component.scss"],
})
export class TaskCreationComponent implements OnInit {
  public taskCreationForm: FormGroup;
  constructor(private modalCtr: ModalController, private fb: FormBuilder) {
    this.taskCreationForm = this.fb.group({
      title: ["", Validators.required],
      priority: ["", Validators.required],
      // dueDate:["" , Validators.required],
      // title:["" , Validators.required],
    });
  }

  public priorityList = [
    { viewValue: "High", value: 1 },
    { viewValue: "Medium", value: 2 },
    { viewValue: "Low", value: 3 },
  ];

  ngOnInit() {}
  async close() {
    // const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss();
  }

  public onSubmittingTask() {
    console.log(this.taskCreationForm.value);
    this.modalCtr.dismiss();
  }
}
