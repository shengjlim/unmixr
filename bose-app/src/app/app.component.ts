import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoDialobBoxComponent } from './components/video-dialob-box/video-dialob-box.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  title = 'bose-app';

  link = new FormControl();

  onSubmit(): void {
    this.spinner.show();
    this.createEmbedUrl();
    this.apiService.getAudio(this.link.value).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.openVideoDialog();
    });
  }

  openVideoDialog(): void {
    const dialogRef = this.dialog.open(VideoDialobBoxComponent);
  }

  createEmbedUrl(): String {
    let linkText = this.link.value;
    let indexOfEqual = linkText.indexOf("=") + 1;
    linkText = linkText.slice(indexOfEqual);
    linkText = linkText;
    this.apiService.linkUrl = linkText;
    return linkText;
  }
}
