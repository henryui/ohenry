import { Router } from 'express';
import { BookService, ClassroomService, UserService } from '../services';
import { RequestUser } from './passport';

// function wrappedMethod(...args: any[]) {
//   const [, res] = args;

//   const returnee = controller.apply(this, args);

//   return typeof returnee?.catch === 'function'
//     ? returnee.catch((err: Error) => {
//         res.negotiate(err);
//       })
//     : returnee;
// }

// TODO: Modularize and move to controllers folder
export default () => {
  const router = Router();

  router.get('/books', async (req, res) => {
    try {
      const { text, page = '0' } = req.query;
      const { books, totalCount } = await BookService.listBooks({
        text: text as string | undefined,
        page: parseInt(page as string, 10),
      });
      return res.status(200).json({ books, totalCount });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  router.get('/users/self', async (req, res) => {
    try {
      const userId = (req.user as RequestUser)?.id;
      if (!userId) {
        return res.status(200).json({ user: null });
      }
      const user = await UserService.findById(userId);
      return res.status(200).json({
        user: {
          ...user,
          tokens: (req.user as RequestUser)!.tokens,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  router.get('/classroom/names', async (req, res) => {
    try {
      const names = await ClassroomService.listNames();
      return res.status(200).json(names);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  router.get('/classroom/:classroomId', async (req, res) => {
    try {
      const { classroomId } = req.params;
      const classroom = await ClassroomService.findById(classroomId);
      return res.status(200).json(classroom);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  return router;
};
