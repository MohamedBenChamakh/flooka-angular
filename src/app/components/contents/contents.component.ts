import { Component, HostListener, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Content } from 'src/app/models/Content';
import { CategoryService } from 'src/app/services/category/category.service';
import { ContentService } from 'src/app/services/content/content.service';
@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit, OnDestroy {
  categoryId?: string;
  destroy$!: Subject<boolean>;
  contents: Content[] = [];
  page: number = 0;
  isBottom: boolean = false;

  constructor(private contentService: ContentService) {

  }


  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.getContents(this.page);
  }



  getContents(page: number) {
    this.contentService.getAllContents(page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => {
      this.contents = values
    });
  }

  getContentsByCategoryId(categoryId: string, page: number) {
    this.contentService.getContentsByCategoryId(categoryId, page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => this.contents = values);
  }

  switchCategory(categoryId?: string) {
    this.categoryId = categoryId;
    this.isBottom = false;
    this.page = 0;
    this.contents = [];
    this.destroy$.next(true);
    if (categoryId)
      this.getContentsByCategoryId(categoryId, this.page);
    else {
      this.getContents(this.page)
    }

  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isBottom) {
      this.isBottom = true;
      this.loadMore();
    }
  }



  loadMore() {
    this.page++;
    if (this.categoryId) {
      this.contentService.getContentsByCategoryId(this.categoryId, this.page).pipe(
        takeUntil(this.destroy$)
      ).subscribe((values: Content[]) => {
        values.forEach(element => {
          this.contents.push(element)
        });
        if (values.length > 0)
          this.isBottom = false;
      });
    } else {
      this.contentService.getAllContents(this.page).pipe(
        takeUntil(this.destroy$)
      ).subscribe((values: Content[]) => {
        values.forEach(element => {
          this.contents.push(element)
        });
        if (values.length > 0)
          this.isBottom = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
