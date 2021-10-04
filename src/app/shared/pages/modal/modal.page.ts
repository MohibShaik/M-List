import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
})
export class ModalPage implements OnInit {
  @Input() status: string;
  @Input() response: any;
  @Input() message: string;

  constructor(private modalCtr: ModalController, private fb: FormBuilder) {
    
  }

  ngOnInit() {}

  async close(msg: boolean) {
    await this.modalCtr.dismiss(msg);
  }

  
}
