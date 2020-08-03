const fs= require('fs');
const path=require('path');

const userss=[];
var lastuserid=0;
var userBooks=[];
var userspath = path.join(__dirname, '..','/data/users.json');
var pathBooks = path.join(__dirname, '..','/data/books.json');


readUsers();
function readUsers(){

fs.readFile(userspath ,function(error,data){
    if (error){
        return console.error(error);
    }
    userss=JSON.parse(data);
});
}
function writeUsers(){
    fs.writeFile(userspath ,JSON.stringify(data) ,function(error,data){
        if (error){
            return console.error(error);
        }
    });
}
function checkForUsersExist(req, res, next) {
    var userid = req.params.id;
    var userexist = userss.findIndex(item => item.id === userid);
    if (userexist > -1) {
      return res.status(409).send("already exist");
    }
    next();
  }


function checkUsersExist(req, res, next) {
    var userid = req.params.id;
    var userexist = userss.findIndex(item => item.id === userid);
    if (userexist == -1) {
      return res.status(404).send(" not found");
    }
    next();
  }

  function getIndex(id) {
    return userss.findIndex(item => item.id == id);
  }


  function getUsers(req, res, next) {
    res.send(200, userArray);
  }

  function postUsers(req, res, next) {
    var userid = req.params.id;
    console.log(userid);
    const user = req.body;
   lastuserid=Number.parseInt(userss[(userss.length-1)].id) || 0;
    userdata.id=lastuserid+1;
    userss.push(user);
    writeUsers(userss);
    res.send(200, "user saved");
    res.end();
  }

  function putUsers(req, res, next) {
      console.log('start');
    var userid = req.params.id;
    const user = req.body;
    user.id=userid;
    console.log(users);
    userss[getIndex(userid)] =user;
    writeUsers(userss);
    res.send(200, "data updated");
    res.end();
    
  }

  function deleteUsers(req, res, next) {
    let userid = req.params.id;
    console.log('start');
    userss.splice(getIndex(userid), 1);
    writeUsers(userss);
    res.status(200).send("user deleted");
    res.end();
  }


readBooks();
function readBooks(){
    fs.readFile(pathBooks,function(err,data){
        if(err){
        return console.error(err);
    }
    userBooks=JSON.parse(data);

    });
}

function writeBooks(data){
    fs.writeFile(pathBooks,JSON.stringify(data),function(error){
        if (err){
            return res.send(404).send('not found');
        }
    });

}

function checkForBooksExist(req,res,next) {
    let bookid=req.params.bookid;
    let userid=req.params.userid;

    var booksExists= userBooks.findIndex(item => item.bookid == bookid && item.id==userid);

    if(booksExists>-1){
        return res.status(409).send("book already exists");
    }
    next();
}


function checkBooksExist(req,res,next){
    let bookid=req.params.bookid;
    let userid=req.params.userid;
    var booksExists= userBooks.findIndex(item => item.bookid == bookid && item.id==userid);

    if(booksExists==-1){
        return res.status(404).send("book not found");
    }
    next();
}

function getIndex(userid,bookid){
    return userBooks.findIndex(item=>item.bookid==bookid && item.id==userid);
}

function getBooks(req,res,next){
    let userid=req.params.userid;
    var filteredbook = userBooks.filter(book => book.id=== userid)
    return res.status(200).send(filteredbook);
}

function addBooks(req,res,next){
    let userid=req.params.userid;
    let bookid=req.params.bookid;
    let bookdata=req.body;
    bookdata.id=userid;
    bookdata.bookid=bookid;
    userBooks.push(bookdata);
    writeBooks(userBooks);
    res.status(200).send("data saved");

}

function updateBooks(req,res,next){
    let userid=req.params.userid;
    let bookid=req.params.bookid;
    let bookdata=req.body;
    bookdata.id=userid;
    bookdata.bookid=bookid;
    userBooks[getIndex(userid,bookid)]=bookdata;
    writeBooks(userBooks);
    res.status(200).send("book updated");
}

function deleteBooks(req,res,next){
    let userid=req.params.userid;
    let bookid=req.params.bookid;
    userBooks.splice(getIndex(userid,bookid),1);
    writeBooks(userBooks);
    res.status(200).send("book deleted");
}

module.exports={
    getBooks,
    addBooks,
    updateBooks,
    deleteBooks,
    checkBooksExist,
    checkForBooksExist,
        checkForUsersExist,
        checkUsersExist,
        getUsers,
        postUsers,
        putUsers,
        deleteUsers
    
    } 
    



