import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListServive } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "testA",
  //     "recipe for TestingCompiler",
  //     "https://cdn.pixabay.com/photo/2018/12/22/16/36/recipe-3889913_960_720.jpg",
  //     [new Ingredient("pizza", 10), new Ingredient("veggies", 23)]
  //   ),
  //   new Recipe(
  //     "testB",
  //     "recipe for TestingCompiler",
  //     "https://cdn.pixabay.com/photo/2018/12/22/16/36/recipe-3889913_960_720.jpg",
  //     [new Ingredient("honey", 23), new Ingredient("honey", 23)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListServive) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getSelectedRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
