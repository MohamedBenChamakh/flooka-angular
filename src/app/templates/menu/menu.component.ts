import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() switchCategoryEvent = new EventEmitter<string>();
  @Input() categoryId?: string;
  categories$!: Observable<Category[]>;
  isLoggedIn!: boolean;
  name?: string;


  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
    this.isLoggedIn = this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.keycloak.loadUserProfile().then(values => {
        if (values.firstName && values.lastName)
          this.name = values.firstName + " " + values.lastName
      })
    }
  }

  constructor(private categoryService: CategoryService, private keycloak: KeycloakService) {
  }


  switchCategory(categoryId?: string) {
    this.switchCategoryEvent.emit(categoryId);
  }


}
