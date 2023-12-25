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
  file?: File;



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
      picture: ""
    });
  }

  uploadFile($event: any) {
    this.file = $event.target.files[0];
  }

  onSubmit() {
    if(this.file)
    this.fileService.saveFile(this.file).pipe(
      concatMap(result => {
        this.contentForm.setValue({ "picture": result });
        const formValue = this.contentForm.value;
        console.log(formValue)
        return this.contentService.saveContent(formValue);
      })).subscribe(console.log)

  }

}
