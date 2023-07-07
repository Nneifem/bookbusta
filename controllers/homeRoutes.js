const router = require('express').Router();
const { Book, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { getQuote } = require('../utils/quote-api');
const { getGenre } = require('../utils/genre-api');

router.get('/', async (req, res) => {
  try {
    // Get all books and JOIN with user data
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });

    // Serialize data so the template can read it
    const books = bookData.map((Book) => Book.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      books, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const book = bookData.get({ plain: true });

    res.render('book', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Book }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/get-quote/:book', async (req, res) => {
  try {
  var bookToSearch = req.params.book;
  console.log(bookToSearch);
  let quoteData = await getQuote(bookToSearch);
    console.log(quoteData.data.items[0]);
    res.render('get-quote', {
    quoteData: quoteData.data.items[0]
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "you know there's an error right?"
    });
  }
});

router.get('/questionaire', async (req, res) => {
  try {
    console.log('questionaire');
    res.render('questionaire', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "you know there's an error right?"
    });
  }
});

router.get('/questionaire/:searchTerm', async (req, res) => {
  try {
    const response = await getGenre(req.params.searchTerm);
    let genreData = response.data.items;
    genreData = genreData.map(genreInfo => ({
      bookImage: genreInfo.volumeInfo.imageLinks.smallThumbnail,
      bookLink: genreInfo.volumeInfo.previewLink,
      bookTitle: genreInfo.volumeInfo.title
    }));

    res.render('questionaire', {
      genreData,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "you know there's an error right?"
    });
  }
});

// route to book search page
router.get("/searchbooks", async (req, res)=> {
  try { 
    // const user = userData.get({ plain: true });
    res.render("search", {
      logged_in: req.session.logged_in
    })
  } catch (error) {
    res.status(500).json(error)
    
  }
})

router.get("/reviews", async (req, res)=> {
  try { // expecting to show all books
     // Get all books and JOIN with user data
     const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
          // attributes: ["comment_body"],
        },
      ],
    });
    // const bookData = await Book.findAll({
    //   include: [Comment],
    // });
// console.log(bookData); // comments
    // Serialize data so the template can read it
    const books = bookData.map((Book) => Book.get({ plain: true }));
    // create another var "comment" -> is to have the array of the comment
console.log(books[0].comments[0].comment_body);
    res.render("reviews", {
      books,
      logged_in: req.session.logged_in
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// New book page: Renders 'create.handlebars' -- redirects to /login if not logged in
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Set up a route to be able to edit an existing book comment 
router.get("/edit/:id", async (req, res) => {
  try {
    const bookComments = await Comment.findByPk(req.params.id, {
      // Join user data and comment data with blog post data
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const comment = bookComments.get({ plain: true });
    console.log(comment);

    if (req.session.logged_in) {
      res.render("edit", {
        ...comment,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
