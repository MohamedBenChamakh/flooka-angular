import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Content } from 'src/app/models/Content';
import { User } from 'src/app/models/User';
import { ContentService } from 'src/app/services/content/content.service';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() categoryId?: string;
  contentForm!: FormGroup;
  file?: File;
  url?: any;
  mediaType?: string | null;

  ngOnInit(): void {
    this.initForm();
  }

  constructor(private formBuilder: FormBuilder,
    private contentService: ContentService,
    private fileService: FileService) { }

  initForm() {
    this.contentForm = this.formBuilder.group({
      title: "",
      description: "",
      media: ""
    });
  }

  uploadFile($event: any) {
    let reader = new FileReader();
    this.file = $event.target.files[0];
    console.log(this.file?.type)
    if (this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.url = reader.result;
        this.mediaType = this.extractMediaType() ;
      };
    }
  }

  deleteFile(): void {
    this.file = undefined;
    this.url = null;
  }

  onSubmit() {
    if (this.file) {
      let mediaType = this.extractMediaType();
      let media: string;
      if (mediaType === "VIDEO") {
        media = "http://localhost:8081/video/" + this.file?.name.split(".")[0]
      } else if (mediaType === "IMAGE") {
        media = "http://localhost:8081/image/" + this.file?.name.split(".")[0]
      }
      this.fileService.saveFile(this.file).pipe(
        concatMap(result => {
          const formValue = {
            ...this.contentForm.value,
            category: new Category(this.categoryId),
            publisher: new User("550e8400-e29b-41d4-a716-446655440001"),
            media: media,
            mediaType: mediaType,
            createdAt: null
          };
          console.log(formValue)
          return this.contentService.saveContent(formValue);
        })).subscribe(console.log)
    } else {
      const formValue = {
        ...this.contentForm.value,
        category: new Category(this.categoryId),
        publisher: new User("550e8400-e29b-41d4-a716-446655440001"),
        createdAt: null
      };
      this.contentService.saveContent(formValue).subscribe()
    }




  }

  extractMediaType(): string | null {
    let ext = this.file?.type.split("/")[0].toUpperCase();
    return ext === "VIDEO" || ext === "IMAGE" ? ext : null;
  }

  isImage(): boolean{
    return this.mediaType === "IMAGE";
  }

  isVideo(): boolean{
    return this.mediaType === "VIDEO";
  }





}
