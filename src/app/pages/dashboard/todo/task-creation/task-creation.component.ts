import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TodoService, User } from "src/app/core";
import { DataService } from "src/app/core/services/data.service";
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-task-creation",
  templateUrl: "./task-creation.component.html",
  styleUrls: ["./task-creation.component.scss"],
})
export class TaskCreationComponent implements OnInit {
  public taskCreationForm: FormGroup;
  tasksList: any;
  public toggleCalender: boolean = false;
  public date: string;
  public type: 'string';
  public userData: User;

  constructor(
    private modalCtr: ModalController,
    private fb: FormBuilder,
    private dataService: DataService,
    private todoService: TodoService,
    private storage: StorageService,
  ) {
    this.taskCreationForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      category: ["", Validators.required],
      priority: [""],
      dueDate: ["", Validators.required],
    });
  }

  public
    = [
      { viewValue: "High", value: 1 },
      { viewValue: "Medium", value: 2 },
      { viewValue: "Low", value: 3 },
    ];

  ngOnInit() {
    this.userData = this.storage.getItem('user');
  }

  get f() {
    return this.taskCreationForm.controls;
  }
  async close() {
    // const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss();
  }

  public onSubmittingTask() {
    console.log(this.taskCreationForm.value);

    if (this.taskCreationForm.invalid) {
      return
    }

    else {
      const data = {
        title: this.taskCreationForm.controls.title.value,
        dueDate: new Date(this.taskCreationForm.controls.dueDate.value),
        priority: this.taskCreationForm.controls.priority.value,
        status: "active",
        description: this.taskCreationForm.controls.description.value,
        category: this.taskCreationForm.controls.category.value,
        userId: this.userData?.id,
      };


      this.todoService.createTask(data).subscribe(x => {
        console.log(x);
      }, (error) => {
        console.log(error)
      })
      this.modalCtr.dismiss();
    }
  }
}
