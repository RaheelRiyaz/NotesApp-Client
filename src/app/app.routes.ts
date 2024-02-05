import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';

export const routes: Routes = [
  { path: '', loadChildren: () => UserModule },
  { path: 'notes', loadChildren: () => NoteModule },
];
