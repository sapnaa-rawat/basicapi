const Books = [];
const usermodule = require("./UserModule");

function checkBook(req,res,next) {
    let bookid=req.params.bookid;
    let userid=req.params.id;
    var bookexists= Books.findIndex(item => item.bookId == bookid&& item.userId==userid);
    console.log(bookexists);
    if(bookexists>-1){
        return res.status(409).send("already exists");
    }
    next();
}

function checkBookExist(req,res,next){
    let bookid=req.params.bookid;
    let userid=req.params.id;
    var bookexists= Books.findIndex(item => item.bookId == bookid&& item.userId==userid);
    if(bookexists==-1){
        return res.status(404).send("book not found");
    }
    next();
}       

function getIndex(userid,bookid){
    return Books.findIndex(item=>item.bookId==bookid && item.userId==userid);
}

function getBooks(req, res, next) {
    var userid = req.params.id;
    var filteredbookdata = Books.filter(book => book.userId === userid) 
    res.status(200).send(filteredbookdata);
    res.end();
}

function createBooks(req, res, next) {
    var userid = req.params.id;
    var bookid = req.params.bookid;
    var bookdata = req.body;
    bookdata.userId = userid;
    bookdata.bookId = bookid;

    Books.push(bookdata);
    res.send(200, "book added ");

}

function updateBooks(req, res, next) {
    let bookid = req.params.bookid;
    let userid=req.params.id;
    const bookdata = req.body;
    delete Books.bookId;

    bookdata.userId = userid;
    bookdata.bookId = bookid;
    Books[getIndex(userid,bookid)] = bookdata;
    res.send(200, "book updated");
    res.end();
}

function deleteBooks(req, res, next) {
    let bookid = req.params.bookid;
    let userid=req.params.id;
    Books.splice(getIndex(userid,bookid), 1);
    res.send(200, "book deleted")
    res.end();
}
module.exports = {
    getBooks,
    createBooks,
    updateBooks,
    deleteBooks,
    checkBookExist,
    checkBook
}