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
  @Output() switchCategoryEvent = new EventEmitter<Category>();
  @Input() category?: Category;
  categories$!: Observable<Category[]>;



  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
    
  }

  constructor(private categoryService: CategoryService, private keycloak: KeycloakService) {
  }


  switchCategory(category?: Category) {
    this.switchCategoryEvent.emit(category);
  }


}
