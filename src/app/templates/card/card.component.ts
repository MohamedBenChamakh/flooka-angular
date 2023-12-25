import { Component, Input } from '@angular/core';
import { Content } from '../../models/Content';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() data!: Content;

  isVideo(): boolean {
    return this.data.mediaType === 'VIDEO';
  }

  isPicture(): boolean {
    return this.data.mediaType === 'PICTURE';
  }

}
