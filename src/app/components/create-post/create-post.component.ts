import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private fileService: FileService,
    private toastrService: ToastrService) { }

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
        this.mediaType = this.extractMediaType();
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
      this.fileService.saveFile(this.file).pipe(
        concatMap((data: any) => {
          this.toastrService.success('Média transmise')
          media = "http://localhost:8081/" + mediaType?.toLowerCase() + "/" + data.fileName;
          console.log(media)
          const formValue = {
            ...this.contentForm.value,
            category: new Category(this.categoryId),
            publisher: new User("550e8400-e29b-41d4-a716-446655440001"),
            media: media,
            mediaType: mediaType,
          };
          return this.contentService.saveContent(formValue);
        })).subscribe({
          next: () => this.toastrService.success('Publication créée'),
          error: (e) => console.log("error while creating post ", e)
        })
    } else {
      const formValue = {
        ...this.contentForm.value,
        category: new Category(this.categoryId),
        publisher: new User("550e8400-e29b-41d4-a716-446655440001")
      };
      this.contentService.saveContent(formValue).subscribe({
        next: (result) => {
          this.toastrService.success('Publication créée')
          console.log(result)
        },
        error: () => console.log("error while creating post")
      })
    }
  }

  onMetadata($event: Event,video: HTMLVideoElement) {
    console.log("onMetadata")
    if(video.duration>60){
      console.log("video more than 1 min")
    }else{
      console.log("video less than 1 min")

    }
    }

  extractMediaType(): string | null {
    let ext = this.file?.type.split("/")[0].toUpperCase();
    return ext === "VIDEO" || ext === "IMAGE" ? ext : null;
  }

  isImage(): boolean {
    return this.mediaType === "IMAGE";
  }

  isVideo(): boolean {
    return this.mediaType === "VIDEO";
  }





}
