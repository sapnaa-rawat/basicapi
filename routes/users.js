var express = require('express');
var router = express.Router();
var usermodule = require("../module/userModule");
var bookmodule = require("../module/bookModule");
var modules=require("../routes/modules");

/* GET users listing. */



router.get('/', userModule.getUser);
router.post('/:id',userModule.checkUser,userModule.createUser);
router.put('/:id',userModule.checkUserExist,userModule.updateUser);
router.delete('/:id',userModule.checkUserExist,usermodule.deleteUser);
router.get('/:id/books', bookModule.getBooks);
router.post('/:id/books/:bookid',bookModule.checkBook,bookModule.createBooks);
router.put('/:id/books/:bookid',bookModule.checkBookExist, bookModule.updateBooks);
router.delete('/:id/books/:bookid',bookModule.checkBookExist,bookmodule.deleteBooks);

router.get('/',modules.getUsers);
router.post('/:userid',modules.checkForUsersExist,modules.postUsers);
router.put('/:userid',modules.checkUsersExist,modules.putUsers);
router.delete('/:userid',modules.checkUsersExist,modules.deleteUsers);
router.get('/book/:userid',modules.getBooks);
router.post('/book/:userid/:bookid',modules.checkForBooksExist,modules.addBooks);
router.put('/book/:userid/:bookid',modules.checkBooksExist,modules.updateBooks);
router.delete('/book/:userid/:bookid',modules.checkBooksExist,modules.deleteBooks);


module.exports = router;