import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeResolverService } from "./recipes-resolver.service";
import { AuthGuardService } from "../auth/auth-guard.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: "", component: RecipeStartComponent },
          { path: "new", component: RecipeEditComponent },
          {
            path: ":id",
            component: RecipeDetailComponent,
            resolve: [RecipeResolverService],
          },
          {
            path: ":id/edit",
            component: RecipeEditComponent,
            resolve: [RecipeResolverService],
          },
        ],
      },
    ]),
  ],
})
export class RecipesModule {}
