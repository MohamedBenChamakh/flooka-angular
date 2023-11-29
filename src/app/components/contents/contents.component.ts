import { Component, OnInit } from '@angular/core';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Content } from 'src/app/models/Content';
import { CategoryService } from 'src/app/services/content/category/category.service';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  categoryId: string | undefined;
  contents$!: Observable<Content[]>;
  categories$!: Observable<Category[]>;

  constructor(private contentService: ContentService, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.contents$ = this.contentService.getAllContents();
    this.categories$ = this.categoryService.getAllCategories();
  }

  switchCategory(categoryId?: string | undefined) {
    this.categoryId = categoryId;
    if (categoryId)
      this.contents$ = this.contentService.getContentsByCategoryId(categoryId);
    else
      this.contents$ = this.contentService.getAllContents();
  }

}
