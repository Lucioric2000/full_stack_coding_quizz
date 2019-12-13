export class FileEntry {
  constructor(
    public name: string,
    public stage_yaml: string,
    public stage: string,
    public answers: string,
    public answers_yaml: string,
    public current_answer?: string,
    public _id?: number,
  ) { }
};
export class Question {
  constructor(
    public title: string,
    public question: string,
    public subtext: string,
    public files: Array<FileEntry>,
    public _id?: number,
  ) { }
}