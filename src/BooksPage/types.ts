// TODO: use common grounds
export enum BookTheme {
  Archeology = 'Archeology',
  Allegory = 'Allegory',
  PoliticalSatire = 'Political Satire',
}

export type BookData = {
  name: string;
  year: number;
  themes: BookTheme[];
  pages: number;
  authors: string[];
  classrooms: string[];
  description?: string;
};
