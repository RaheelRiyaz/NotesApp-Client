import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteResponse, UpdateNoteRequest } from '../../../models/note';
import { CommonService } from '../../../services/common.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css',
})
export class EditNoteComponent {
  constructor(
    private service: BaseService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  noteId!: string;
  showImage: boolean = false;
  basePath: string = environment.basePath;
  noteRequest: UpdateNoteRequest = new UpdateNoteRequest();
  noteImage?: string;
  ngOnInit(): void {
    this.getNoteId();
    this.getNote();
  }

  getNoteId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => (this.noteId = res['id']),
    });
  }

  getNote(): void {
    this.service.Find<NoteResponse>(`notes/${this.noteId}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.noteImage = response.result.filePath;
          this.noteRequest = <UpdateNoteRequest>response.result;
        }
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
  updateNote(): void {
    this.service
      .Update<UpdateNoteRequest, NoteResponse>(this.noteRequest, 'notes')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            CommonService.fireSwal(response.message);
            this.route.navigate(['/notes']);
          } else CommonService.fireSwal(response.message, false);
        },
        error: (err: Error) => [CommonService.fireSwal(err.message, false)],
      });
  }

  toggleSettings(settings: any): void {
    settings.classList.toggle('show');
  }

  removeNoteImage(): void {
    this.service.Delete<number>(`notes/note-image/${this.noteId}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.noteImage = '';
          this.getNoteId();
        }
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
