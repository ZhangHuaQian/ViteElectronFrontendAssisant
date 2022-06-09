interface BookItem {
  count: number,
  datetime: string
  id: number,
  title: string,
  week: number
}

interface IssueFormState {
  issue: string
  solution: string
  key: number
}
interface CodeFormState {
  describe: string
  solution: string
  key: number
}
interface Scrips {
  key: string,
  Path: string,
  Name:string,
  pid:number,
}

interface ProgramFormState {
  projectName: string;
  projectAddress: string;
  gitDepot: string;
  key: number;
}
interface ProgramEditForm {
  projectName: string;
  projectAddress: string;
  gitDepot: string;
  key: number;
}

interface DataItem {
  key: number;
  articleName: string;
  articleAddress: string;
}

interface TechnicalArticlesFormState {
  articleName: string;
  articleAddress: string;
}