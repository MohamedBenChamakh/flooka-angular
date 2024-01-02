import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/Content';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() contentId: string | undefined;
  content$!: Observable<Content>;

  constructor(
    private contentService: ContentService) {
  }

  ngOnInit() {
    if (this.contentId)
      this.content$ = this.contentService.getContentById(this.contentId);

      console.log(this.contentId)
  }

  isVideo(type: string): boolean {
    return type === 'VIDEO';
  }

  isPicture(type: string): boolean {
    return type === 'PICTURE';
  }


}
