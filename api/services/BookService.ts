import { FilterQuery, Types } from 'mongoose';
import schema, { BookDoc, IAuthor, IBook, IClassroom } from '../loader/schema';

const { Author, AuthorBook, Book, Classroom, ClassroomBook } = schema;

const LIMIT = 20;

class BookService {
  // # StartRegion Private
  private async findAuthorsFromBooks(bookIds: Types.ObjectId[]) {
    const authorBook = await AuthorBook.find({
      book: { $in: bookIds },
    }).lean();
    const authorIds = authorBook.map(({ author }) => author);

    const authors = await Author.find({ _id: { $in: authorIds } }).lean<
      IAuthor[]
    >();
    const authorIdMap = authors.reduce<Record<string, string>>((acc, cur) => {
      acc[cur._id.toString()] = cur.name;
      return acc;
    }, {});

    return authorBook.reduce<Record<string, string[]>>((acc, cur) => {
      if (!acc[cur.book.toString()]) {
        acc[cur.book.toString()] = [];
      }
      const authorName = authorIdMap[cur.author.toString()];
      acc[cur.book.toString()].push(authorName);
      return acc;
    }, {});
  }

  private async findClassroomsFromBooks(bookIds: Types.ObjectId[]) {
    const classroomBook = await ClassroomBook.find({
      book: { $in: bookIds },
    }).lean();
    const classroomIds = classroomBook.map(({ classroom }) => classroom);

    const classrooms = await Classroom.find({
      _id: { $in: classroomIds },
    }).lean<IClassroom[]>();
    const classroomIdMap = classrooms.reduce<Record<string, string>>(
      (acc, cur) => {
        acc[cur._id.toString()] = cur.name;
        return acc;
      },
      {},
    );
    return classroomBook.reduce<Record<string, string[]>>((acc, cur) => {
      if (!acc[cur.book.toString()]) {
        acc[cur.book.toString()] = [];
      }
      const classroomName = classroomIdMap[cur.classroom.toString()];
      acc[cur.book.toString()].push(classroomName);
      return acc;
    }, {});
  }

  // # StartRegion Public
  public async listBooks({ text, page = 0 }: { text?: string; page: number }) {
    const query: FilterQuery<BookDoc> = {};
    if (text) {
      query.$text = {
        $search: text,
      };
    }

    const bookQuery = Book.find(query).select(
      'name year themes pages description',
    );

    if (!text) {
      bookQuery.sort('name');
    }
    const [books, totalCount] = await Promise.all([
      bookQuery
        .skip(page * LIMIT)
        .limit(LIMIT)
        .lean<
          Pick<
            IBook,
            '_id' | 'name' | 'year' | 'themes' | 'pages' | 'description'
          >[]
        >(),
      Book.countDocuments(query),
    ]);
    const bookIds = books.map(({ _id }) => _id);

    const [authorBookMap, classroomBookMap] = await Promise.all([
      this.findAuthorsFromBooks(bookIds),
      this.findClassroomsFromBooks(bookIds),
    ]);

    return {
      books: books.map(book => ({
        ...book,
        authors: authorBookMap[book._id.toString()] || [],
        classrooms: classroomBookMap[book._id.toString()] || [],
      })),
      totalCount,
    };
  }
}

export default new BookService();
