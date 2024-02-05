import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseService } from '../services/base.service';
import { InterceptorService } from '../services/interceptor.service';
import { TrashNotesComponent } from './pages/trash-notes/trash-notes.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { EditNoteComponent } from './pages/edit-note/edit-note.component';
import { ViewImageComponent } from './pages/view-image/view-image.component';

@NgModule({
  declarations: [NoteComponent, HomeComponent, TrashNotesComponent, AddNoteComponent, EditNoteComponent, ViewImageComponent],
  imports: [CommonModule, NoteRoutingModule, FormsModule, HttpClientModule],
  providers: [
    BaseService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
})
export class NoteModule {}
