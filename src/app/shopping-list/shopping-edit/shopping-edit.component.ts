import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListServive } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemindex: number;
  editedItem: Ingredient;

  @ViewChild("f", { static: false }) form: NgForm;

  constructor(private shoppingListService: ShoppingListServive) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.editedItemindex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const value = this.form.value;
    if (!this.editMode) {
      this.shoppingListService.addIngredient(
        new Ingredient(value.name, value.amount)
      );
    }
    this.shoppingListService.updateIngredient(value, this.editedItemindex);
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemindex);
    this.onClear();
    this.editMode = false;
  }

  onClear() {
    this.form.reset();
  }
}
