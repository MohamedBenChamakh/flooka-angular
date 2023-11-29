import { Component, OnInit } from '@angular/core';
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

  contentId!: string | null;
  content$!: Observable<Content>;

  constructor(
    private route: ActivatedRoute, 
    private contentService: ContentService) {

  }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get("contentId");
    if(this.contentId){
      this.content$ = this.contentService.getContentById(this.contentId);
    }
  }

}
