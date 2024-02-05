export class NoteResponse {
  id!: string;
  title!: string;
  description!: string;
  createdOn!: Date;
  filePath?: string;
}

export class RecoverNoteRequest {
  constructor(private id: string) {}
}

export class NoteRequest {
  title!: string;
  description!: string;
}

export class UpdateNoteRequest extends NoteRequest {
  id!: string;
}
