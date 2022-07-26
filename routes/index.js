const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');

const NotFoundError = require('../error-classes/NotFoundError');

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
