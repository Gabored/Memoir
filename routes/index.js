const router = require('express').Router();
const express = require('express');
const authMiddleware = require('./../src/middlewares/auth');
const usersController = require('./../src/controllers/users');
const memoriasController = require('./../src/controllers/memorias');
const commentsController = require('./../src/controllers/comments');
const reactionsController = require('./../src/controllers/reactions');
const mediasController = require('./../src/controllers/medias');
const hashtagsController = require('./../src/controllers/hashtags');
const loginController = require('./../src/controllers/login');

router.use(express.json());

// Auth
router.get('/login', loginController.login);

// User
//router.get('/users', authMiddleware);
// CRUD USERS
router.get('/users', usersController.listar);
router.get('/users/:id', usersController.ver);
router.post('/users', usersController.crear);
router.put('/users/:id', usersController.editar);
router.delete('/users/:id', usersController.eliminar);

router.get('/memorias', authMiddleware);
// CRUD MEMORIAS
router.get('/memorias', memoriasController.listar);
router.get('/memorias/:id', memoriasController.ver);
router.post('/memorias', memoriasController.crear);
router.put('/memorias/:id', memoriasController.editar);
router.delete('/memorias/:id', memoriasController.eliminar);

router.get('/comments', authMiddleware);
// CRUD COMMENTS
router.get('/comments', commentsController.listar);
router.get('/comments/:id', commentsController.ver);
router.post('/comments', commentsController.crear);
router.put('/comments/:id', commentsController.editar);
router.delete('/comments/:id', commentsController.eliminar);

router.get('/reactions', authMiddleware);
// CRUD REACTIONS
router.get('/reactions', reactionsController.listar);
router.get('/reactions/:id', reactionsController.ver);
router.post('/reactions', reactionsController.crear);
router.put('/reactions/:id', reactionsController.editar);
router.delete('/reactions/:id', reactionsController.eliminar);

router.get('/medias', authMiddleware);
// CRUD MEDIAS
router.get('/medias', mediasController.listar);
router.get('/medias/:id', mediasController.ver);
router.post('/medias', mediasController.crear);
router.put('/medias/:id', mediasController.editar);
router.delete('/medias/:id', mediasController.eliminar);

router.get('/hashtags', authMiddleware);
// CRUD HASHTAGS
router.get('/hashtags', hashtagsController.listar);
router.get('/hashtags/:id', hashtagsController.ver);
router.post('/hashtags', hashtagsController.crear);
router.put('/hashtags/:id', hashtagsController.editar);
router.delete('/hashtags/:id', hashtagsController.eliminar);

module.exports = router;