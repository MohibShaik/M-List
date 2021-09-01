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
  public currentDate: string;
  public slidesOptions = {
    initialSlide: 3,
    speed: 400,
  };
  public userData: User;
  public AllTasks: any;
  constructor(
    private authService: AuthService,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private todoService: TodoService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.currentDate = moment().format(" Do MMM  YY");
    this.userData = JSON.parse(this.storage.getItem('user'));
    this.getAllTasks();
  }

  public getAllTasks() {
    this.todoService.getAllTasks(this.userData?.id).subscribe(response => {
      console.log(response);
      this.AllTasks = response.filter(task => task.status.toLowerCase() === 'active' || task.status.toLowerCase() === 'completed');
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
    this.todoService.deleteTask(task?.id).subscribe(response => {
      console.log(response);
      slidingItem.close();
      this.getAllTasks();
    }, (error) => {
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  public updateTask(task: Task, slidingItem) {
    const taskData = {
      category: task.category,
      description: task.description,
      dueDate: task.dueDate,
      id: task.id,
      priority: task.priority,
      status: "completed",
      title: task.title,
      userId: task.userId
    }

    this.todoService.updateTask(taskData, task?.id).subscribe(response => {
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
}
