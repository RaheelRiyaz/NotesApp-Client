import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoteComponent } from './note.component';
import { TrashNotesComponent } from './pages/trash-notes/trash-notes.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { EditNoteComponent } from './pages/edit-note/edit-note.component';
import { ViewImageComponent } from './pages/view-image/view-image.component';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'trash', component: TrashNotesComponent },
      { path: 'add', component: AddNoteComponent },
      { path: 'edit/:id', component: EditNoteComponent },
      { path: 'view-image/:url', component: ViewImageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteRoutingModule {}
