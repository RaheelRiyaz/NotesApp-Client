import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { NoteResponse, RecoverNoteRequest } from '../../../models/note';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrl: './trash-notes.component.css',
})
export class TrashNotesComponent {
  constructor(private service: BaseService) {}
  trashNotes: NoteResponse[] = [];

  ngOnInit(): void {
    this.getTrashNotes();
  }

  getTrashNotes(): void {
    this.service.Fetch<NoteResponse[]>('notes/trash-notes').subscribe({
      next: (response) => {
        if (response.isSuccess) this.trashNotes = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  deleteNote(id: string): void {
    CommonService.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`notes/trash-note/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              CommonService.fireSwal(response.message);
              this.getTrashNotes();
            } else CommonService.fireSwal(response.message, false);
          },
          error: (err: Error) => {
            CommonService.fireSwal(err.message, false);
          },
        });
      }
    });
  }

  recoverNote(id: string): void {
    this.service
      .Post<RecoverNoteRequest, number>(
        new RecoverNoteRequest(id),
        'notes/recover-note'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            CommonService.fireSwal(response.message);
            this.getTrashNotes();
          } else CommonService.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          CommonService.fireSwal(err.message, false);
        },
      });
  }
}
