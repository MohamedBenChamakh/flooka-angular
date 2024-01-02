import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs';
import { Content } from 'src/app/models/Content';
import { ContentService } from 'src/app/services/content/content.service';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  contentForm!: FormGroup;
  file?: Blob;
  url?: any;

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
    if (this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }

  deleteFile(): void {
    this.file = undefined;
    this.url = null;
  }

  onSubmit() {
    if (this.file)
      this.fileService.saveFile(this.file).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading file:', error);
        });

    /*  .pipe(
        concatMap(result => {
          this.contentForm.setValue({ "media": result });
          const formValue = this.contentForm.value;
          console.log(formValue)
          return this.contentService.saveContent(formValue);
        })).subscribe(console.log)*/

  }

}
