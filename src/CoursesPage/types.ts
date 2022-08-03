export enum Days {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export type CourseInfo = {
  newCollection?: boolean;
  name: string;
  notice?: string;
  description: string;
  coverImg?: string;
  iconImg?: string;
  rating: {
    grade: string;
    difficulty?: number;
    educational?: number;
    fun?: number;
  };
  classTimes: { [key in Days]?: string[] }[];
  bookList: {
    bookShelfName: string;
    booksImg?: string;
  }[];
  enrollName: string;
};
