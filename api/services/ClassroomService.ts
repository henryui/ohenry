import schema, { IClassroom } from '../loader/schema';

const { Classroom } = schema;

class ClassroomService {
  // # StartRegion Private

  // # StartRegion Public
  public async listNames() {
    // TODO: Do not use dropdown when classes increase
    const classNames = await Classroom.find({})
      .select('name')
      .lean<Pick<IClassroom, '_id' | 'name'>[]>();
    return classNames;
  }

  public async findById(classroomId?: string) {
    const classroom = await Classroom.findById(classroomId).lean<IClassroom>();
    return classroom;
  }
}

export default new ClassroomService();
