//CRUD
const express =require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4:uuid}=require('uuid');

PORT=8089;

app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

  

// app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let comments=[
    {
        id:uuid(),
        username: "Oscar Wilde",
        comment:"Be yourself; everyone else is already taken."
    },

    {
        id:uuid(),
        username: "Dr. Seuss",
        comment:"You know you're in love when you can't fall asleep because reality is finally better than your dreams."
    },

    {
        id:uuid(),
        username: "Robert Frost",
        comment:"In three words I can sum up everything I've learned about life: it goes on."
    },
    {
        id:uuid(),
        username: "Friedrich Nietzsche",
        comment:"Without music, life would be a mistake."
    },
    {
        id:uuid(),
        username: "Bill Keane",
        comment:"Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."
    }
    
]

app.get('/', (req, res) => {
    // res.send(`<h1>hello world</h1>`)
    // res.render('index',{arr})
    res.redirect('/comments')
});

app.get('/comments', (req, res) => {
    // res.send(`<h1>hello world</h1>`)
    res.render('index',{comments})
});


app.get('/comments/new', (req, res) => {
    // res.send(`<h1>hello world</h1>`)
    res.render('new')
});

app.post('/comments', (req, res) => {
    // res.send(`<h1>Post Sent</h1>`)
    console.log(req.body);
    comments.push({
            id: uuid(),
            username: req.body.username,
            comment:req.body.comment
        });
    res.redirect('/comments')
});


//showing a perticular comment

app.get('/comments/:id', (req, res) => {
    console.log(req.params);
    let fcomment=comments.find((item)=>{return item.id==req.params.id})
    console.log(fcomment)
    // res.send(`<h1>Showing Comments</h1>`)
    res.render('show', {fcomment})

});


app.get('/comments/:id/edit', (req, res) => {
    // res.send(`<h1>hello world</h1>`)
    let {commentId}=req.params;
    let fcomment=comments.find((item)=>{return item.id==commentId})
    console.log(fcomment)
    res.render('edit', {fcomment});
});


app.patch('/comments/:commentId', (req, res) => {
    // res.send(`<h1>Post Sent</h1>`)
    let {commentId}=req.params;
   
    let fcomment=comments.find((item)=>{return item.id==commentId})
    // comments.push({
    //         id: fcomment.id,
    //         username: fcomment.username,
    //         comment:req.body.comment
    //     });
    let {comment}=req.body;
    fcomment.comment=comment;
    res.redirect('/comments');
});


app.delete('/comments/:commentId', (req, res) => {
    // res.send(`<h1>hello world</h1>`)
    let {commentId}=req.params;
    let arr=comments.filter((item)=>{return item.id!=commentId})
    comments=arr;
    res.redirect('/comments')
});


// comments.push({
//     id: 3,
//     username: "monioooo",
//     comment:"Gadhaaaaaaa"
// })

app.listen(PORT, ()=>{
    console.log(`Server connected at port ${PORT}`)
});