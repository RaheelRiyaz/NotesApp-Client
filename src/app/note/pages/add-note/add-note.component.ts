import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';
import { NoteRequest, NoteResponse } from '../../../models/note';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent {
  constructor(private service: BaseService, private route: Router) {}

  addNote(form:any): void {
    const formData = new FormData(form);
    this.service
      .Post<FormData, NoteResponse>(formData, 'notes')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            CommonService.fireSwal(response.message);
            this.route.navigate(['/notes']);
          } else CommonService.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          CommonService.fireSwal(err.message, false);
        },
      });
  }
}
