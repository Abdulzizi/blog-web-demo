const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const articles = [];

app.get('/', (req, res) => {
    // console.log(articles);
    res.render('index.ejs', {articles: articles});
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/new', (req, res) => {
    const article = {
        title: req.body.title,
        dateCreated: new Date().toLocaleDateString(),
        desc: req.body.desc,
        body: req.body.body
    };

    articles.push(article);
    // console.log(articles);
    
    res.redirect('/');
});

app.get('/read-more/:articleIndex', (req,res) => {
    const articleIndex = req.params.articleIndex;
    const selectedIndex = articles[articleIndex];

    res.render('readMore.ejs', { article: selectedIndex, index: articleIndex });
});

app.get('/edit/:articleIndex', (req,res) => {
    const articleIndex = req.params.articleIndex;
    const selectedArticle = articles[articleIndex];

    res.render('edit.ejs', {article: selectedArticle, index: articleIndex});
});

app.post('/edit/:articleIndex', (req,res) => {
    const articleIndex = req.params.articleIndex;

    // Update
    articles[articleIndex] = {
        title: req.body.title,
        dateCreated: new Date().toLocaleDateString(),
        desc: req.body.desc,
        body: req.body.body
    };

    res.redirect('/');
});

app.get('/delete', (req,res) => {
    const articleIndex = req.query.index;

    // Konfrmasi
    const articleToDelete = articles[articleIndex];

    res.render('delete.ejs', {article: articleToDelete, index: articleIndex});
});

app.post('/delete', (req,res) => {
    const articleIndex = req.query.index;

    articles.splice(articleIndex, 1);

    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
