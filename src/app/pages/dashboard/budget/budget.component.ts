import { Component, OnInit } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "src/app/shared/pages/modal/modal.page";
@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"],
})
export class BudgetComponent implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit(){
    
  }

  async openModal() {
    const modalRef = await this.modalCtrl.create({
      component: ModalPage,
      // componentProps: {
        
      // },
    });

    modalRef.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        // this.modalDataResponse = modalDataResponse.data;
        // console.log("Modal Sent Data : " + modalDataResponse.data);
      }
    });

    return await modalRef.present();
  }
}
