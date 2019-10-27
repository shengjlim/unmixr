import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoDialobBoxComponent } from './components/video-dialob-box/video-dialob-box.component';
import { DirectionsdialogComponent } from './components/directionsdialog/directionsdialog.component';

export interface Choice {
  value: string;
  var: string;
}

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

  choices: Choice[] = [
    { value: 'Karaoke', var: 'karaoke' },
    { value: 'A Cappella', var: 'vocals' },
    { value: 'Drum Training', var: 'drum' }
  ];

  link = new FormControl('', Validators.required);
  option = new FormControl('', Validators.required);

  onSubmit(): void {
    if (this.option.value == '' || this.link.value == '') {
      return;
    }
    this.spinner.show();
    this.createEmbedUrl();
    console.log(this.option.value);
    fetch("http://35.230.98.121:7000?url=" + this.link.value + "&option=" + this.option.value).then(res => res.blob()).then(blob => {
      var bb = new Blob([blob], { type: 'audio/wav' });
      this.apiService.audioUrl = window.URL.createObjectURL(bb);
      this.spinner.hide();
      this.openVideoDialog();
    });
    // fetch("http://35.230.98.121:7000?url=" + this.link.value).then(res => res.blob()).then(blob => {
    //   var bb = new Blob([blob], { type: 'audio/wav' });
    //   this.apiService.audioUrl = window.URL.createObjectURL(bb);
    //   this.spinner.hide();
    //   this.openVideoDialog();
    // });
  }

  openVideoDialog(): void {
    const dialogRef = this.dialog.open(VideoDialobBoxComponent);
  }

  getDirections(): void {
    const dialogRef = this.dialog.open(DirectionsdialogComponent);
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
