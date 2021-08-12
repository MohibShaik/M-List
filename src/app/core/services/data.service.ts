import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Task } from "../index";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  getTasksList() {
    return this.firestore.collection("tasks").snapshotChanges();
  }

  public createTask(task: Task) {
    console.log('im in service');
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("tasks")
        .add(task)
        .then(
          (res) => {
            console.log(res, "res");
          },
          (err) => reject(err)
        );
    });
  }

  updatePolicy(task: Task) {
    // delete policy.id;
    this.firestore.doc("tasks/" + task.id).update(task);
  }

  deletePolicy(taskId: string) {
    this.firestore.doc("tasks/" + taskId).delete();
  }
}
