import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-directionsdialog',
  templateUrl: './directionsdialog.component.html',
  styleUrls: ['./directionsdialog.component.css']
})
export class DirectionsdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DirectionsdialogComponent>,
  ) { }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }

}
