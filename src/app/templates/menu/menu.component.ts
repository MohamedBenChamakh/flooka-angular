import { Component, EventEmitter, Input, Output } from '@angular/core';
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


  ngOnInit(){
    this.categories$ = this.categoryService.getAllCategories();
  }

  constructor( private categoryService: CategoryService){
  }


  switchCategory(categoryId?: string) {
    this.switchCategoryEvent.emit(categoryId);
  }


}
