const express = require('express');
const Joi = require('joi'); 
const app = express();

app.use(express.json()); //piece of middleware
//and then we call app.use to use this middleware to 
// in the request processing pipeline


const courses=[
    {id:1,name:'physics'}, 
    {id:2,name:'chemistry'},
    {id:3,name:'biology'}    
]
app.get('/',(req,res) => {
res.send('Welcome to the courses list.');
});

app.get('/api/courses',(req,res)=>{
res.send(courses);
})


app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course not found');
     res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const schema = {
        name:Joi.string().min(3).required()  
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);

    if(!req.body.name || req.body.name<3)
    {
        res.status(400).send('Bad request....')
        return;
    }

    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});
 
//app.get('/api/posts/:year/:month',(req,res)=>{
  //  res.send(req.query);
    //})
//app.listen(3000,()=> console.log('port 3000...'));

const port = process.env.PORT || 3000

app.listen(port,()=> console.log(`Listening on ${port}`));

