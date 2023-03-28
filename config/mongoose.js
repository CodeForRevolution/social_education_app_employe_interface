const mongoose=require('mongoose');mongodb://localhost/OWNSCIAL
mongoose.connect('mongodb://localhost/codeE');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting the db'));
db.once('open',function(){
    console.log("*****Conected to the database");
})
module.exports=db;