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
  selectedContentId?: string;
  categoryId?: string;
  destroy$!: Subject<boolean>;
  contents: Content[] = [];
  pageNumber: number = 0;
  isBottom: boolean = false;

  constructor(private contentService: ContentService) {

  }


  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.getContents();
  }

  viewContentDetails(contentId: string) {
    this.selectedContentId = contentId;
    console.log(this.selectedContentId)
  }

  getContents() {
    this.contentService.getAllContents().pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => {
      this.contents = values
    });
  }

  getContentsByCategoryId(categoryId: string) {
    this.contentService.getContentsByCategoryId(categoryId).pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => this.contents = values);
  }

  switchCategory(categoryId?: string) {
    this.destroy$.next(true);
    this.categoryId = categoryId;
    if (this.categoryId)
      this.getContentsByCategoryId(this.categoryId);
    else
      this.getContents()

  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isBottom) {
      this.isBottom = true;
      this.loadMore();
    }
  }



  loadMore() {
    this.pageNumber++;
    this.contentService.getAllContents().pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => {
      values.forEach(element => {
        this.contents.push(element)
      });
      this.isBottom = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
