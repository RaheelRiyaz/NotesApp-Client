import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { NoteResponse } from '../../../models/note';
import { CommonService } from '../../../services/common.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private service: BaseService) {}
  notes: NoteResponse[] = [];
  basePath:string = environment.basePath;
  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes(): void {
    this.service.Fetch<NoteResponse[]>('notes').subscribe({
      next: (response) => {
        if (response.isSuccess) this.notes = response.result;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }



  deleteNote(id: string): void {
    CommonService.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<NoteResponse>(`notes/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              CommonService.fireSwal(response.message);
              this.getAllNotes();
            } else CommonService.fireSwal(response.message, false);
          },
          error: (err: Error) => {
            CommonService.fireSwal(err.message, false);
          },
        });
      }
    });
  }
}
