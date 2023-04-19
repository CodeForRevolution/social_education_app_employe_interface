const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://shakir973019:G0QGgk9OCWGgK9xd@cluster0.kzx0xqp.mongodb.net/?retryWrites=true&w=majority');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting the db'));
db.once('open',function(){
    console.log("*****Conected to the database**********");
})
module.exports=db;