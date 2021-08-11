import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
})
export class ModalPage implements OnInit {
  // @Input() name: string;
  public createBudgetForm: FormGroup;
  public categoryList = [
    { categoryId: 1, categoryName: "Groceries" },
    { categoryId: 2, categoryName: "Personal Loan" },
    { categoryId: 3, categoryName: "Shopping" },
    { categoryId: 4, categoryName: "Credit Card" },
    { categoryId: 5, categoryName: "Eating" },
    { categoryId: 6, categoryName: "Education" },
    { categoryId: 7, categoryName: "Entertainment" },
    { categoryId: 8, categoryName: "Furniture" },
    { categoryId: 9, categoryName: "Fitness" },
    { categoryId: 10, categoryName: "Medical" },
  ];

  public slideOpts = {
    initialSlide: 3,
    speed: 400,
  };
  constructor(private modalCtr: ModalController, private fb: FormBuilder) {
    this.createBudgetForm = this.fb.group({
      categoryType: ["", Validators.required],
      categoryName: ["", Validators.required],
      categoryAmount: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async close() {
    // const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss();
  }

  public onSubmittingBudget() {
    console.log(this.createBudgetForm.value);
    this.modalCtr.dismiss();
  }
}
