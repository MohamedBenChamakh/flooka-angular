import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../../models/Content';
import { ContentService } from 'src/app/services/content/content.service';
import { Subject, takeUntil } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data!: Content;
  isLiked!: boolean;
  destroy$!: Subject<boolean>;

  ngOnInit(): void {
    this.keycloak.loadUserProfile()
    .then(values => 
      this.isLiked = this.data.likes
      .find(element => element.user.id === values.id) != null);

    this.destroy$ = new Subject<boolean>();
  }

  constructor(private contentService: ContentService, private keycloak: KeycloakService) { }

  onLike() {
    this.isLiked = !this.isLiked;
    this.contentService.likeContent(this.data.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value)=>{
        this.data = value;
      },
      error: ()=> this.isLiked = !this.isLiked
    })
    


  }

  isVideo(): boolean {
    return this.data.mediaType === 'VIDEO';
  }

  isImage(): boolean {
    return this.data.mediaType === 'IMAGE';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
