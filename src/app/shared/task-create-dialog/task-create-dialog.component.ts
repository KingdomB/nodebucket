/**
 * Title: task-create-dialog.component.ts
 * Author: Professor Krasso
 * Date: 14th December 2020
 * Modified By: King Major
 * Description: Input form logic for tasks
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-task-create-dialog.component.ts',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.css']
})

export class TaskCreateDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<TaskCreateDialogComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
