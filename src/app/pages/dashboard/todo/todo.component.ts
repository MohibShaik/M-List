import { StorageService } from './../../../core/services/storage.service';
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { AuthService, Task, ToastService, TodoService, User } from "src/app/core";
import { TaskCreationComponent } from "./task-creation/task-creation.component";


@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  public currentDate: any;
  public slidesOptions = {
    initialSlide: 3,
    speed: 400,
  };
  public userData: User;
  public AllTasks: any;
  public toggleCalender: boolean = false;
  selectedDate: any;
  constructor(
    private authService: AuthService,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private todoService: TodoService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.currentDate = moment();
    this.selectedDate = moment();
    this.userData = JSON.parse(this.storage.getItem('user'));
    this.getAllTasks();
  }

  public getAllTasks() {
    this.todoService.getAllTasks(this.userData?.id).subscribe(response => {
      this.AllTasks = response;
      console.log(this.AllTasks);
    }, (error) => {
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  public async createNewTask() {
    const modalRef = await this.modalCtrl.create({
      component: TaskCreationComponent,
    });
    modalRef.onDidDismiss().then((modalDataResponse) => {
      this.getAllTasks()
    });

    return await modalRef.present();
  }


  public deleteTask(task: Task, slidingItem) {
    this.todoService.deleteTask(task?.task_uid).subscribe(response => {
      console.log(response);
      slidingItem.close();
      this.getAllTasks();
    }, (error) => {
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  public updateTask(task: Task, slidingItem) {
    const taskData = {
      category: task.task_category,
      description: task.task_description,
      dueDate: task.task_due_date,
      id: task.task_uid,
      priority: task.task_priority,
      isCompleted: true,
      isActive: true,
      title: task.task_title,
      userId: task.created_user_uid
    }

    this.todoService.updateTask(taskData, task.task_uid).subscribe(response => {
      console.log(response);
      slidingItem.close();
      this.getAllTasks();
    }, (error) => {
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  public closeItem(slidingItem) {
    slidingItem.close();
  }

  public onDateSelection(event, eleRef) {
    console.log(event);
    this.toggleCalender = !this.toggleCalender;
    this.selectedDate = moment(event);

  }
}
