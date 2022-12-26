class NewsController {
  //[GET] /News
  index(req, res) {
    res.render('phoneList');
  }
  //[GET] /news/:slug
  show(req, res) {
    res.send('NEW DETAIL!!!');
  }
}
module.exports = new NewsController();
