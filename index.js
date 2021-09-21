const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const { response } = require('express');




var app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var mysqlconnection = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'studentdb',
multipleStatements:true

});



mysqlconnection.connect((err)=>{

    if(!err){
        console.log('connection established here ');
    }

    else{

        console.log('connection failed');
    }
});


//crud terms  from here 


app.post('/student',(req,res)=>{
mysqlconnection.query('INSERT INTO students(name,email,phone) values(?,?,?)',[req.body.name,req.body.email,req.body.phone],(err,response)=>{

if(!err){
    res.send('record has created on your wish');
}


else{


throw err;
}
});


});


//get a data of single student

app.get('/student/:id',(req,res)=>{

    mysqlconnection.query('SELECT * FROM student where id = ?',[req.params.id],(err,rows,feilds)=>{

        if(!err){
            res.send(rows);
        }
        else{

            throw err;
        }
    } )
});


// for all student details 


app.get('/student',(req,res)=>{

    mysqlconnection.query('select * from student',(err,rows,feilds)=>{

        if(!err)
        {
            response.send(rows);
        }

        else{
            throw err;
        }
    });
}
)





//for updation 


app.put('/student/:id',(req,res)=>{

    mysqlconnection.query('UPDATE student SET phone= ? WHERE ID=?', [req.body.phone,req.params.id],(err,rows,fields)=>{


        if(!err)
        {
            res.send("record is now updated")
        }

        else{
            throw err;
        }

    });
}
)



//for removing a single student 


app.delete('/student/:id',(req,res)=>{

mysqlconnection.query("delete from students where id=?", [req,params.id],(err,rows,feilds)=>{

    if(!err){
        res.send('record created sucesfully');
    }
    else{

        throw err;
    }
})
})












app.listen(3000,()=>{

    console.log('express running herer ');
});