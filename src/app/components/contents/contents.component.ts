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
  pageNumber: number = 0;
  private scrolling = false;

  constructor(private contentService: ContentService, 
    private zone: NgZone) {

  }


  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.getContents();
  
  }

  getContents() {
    this.contentService.getAllContents().pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => this.contents = values);
  }

  getContentsByCategoryId(categoryId: string) {
    this.contentService.getContentsByCategoryId(categoryId).pipe(
      takeUntil(this.destroy$)
    ).subscribe((values: Content[]) => this.contents = values);
  }

  switchCategory(categoryId?: string) {
    console.log(categoryId)
    this.destroy$.next(true);
    this.categoryId =categoryId;
    if (this.categoryId)
      this.getContentsByCategoryId(this.categoryId);
    else
      this.getContents()

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.scrolling) {
      this.scrolling = true;

      this.zone.runOutsideAngular(() => {
        // Use a timeout to debounce the scroll event
        setTimeout(() => {
          this.doAction();
          this.scrolling = false;
        }, 100); // Adjust the timeout value as needed
      });
    }
  }
  doAction() {
    // In most browsers, scroll is given to the document.documentElement
    let pos = window.scrollY + window.innerHeight;
    let max = document.documentElement.scrollHeight;

    // pos/max will give you the distance between scroll bottom and the bottom of the screen in percentage.
    // Adding a small threshold (e.g., 10) to make sure it triggers before reaching the exact bottom.
    if (pos >= max - 20) {
      // Do your action here
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
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
