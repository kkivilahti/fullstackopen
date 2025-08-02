const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) =>
    total + blog.likes, 0
  );
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, currentBlog) =>
    currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  );
};

const mostBlogs = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author');

  const authorBlogCount = _.map(groupByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length
  }));

  return _.maxBy(authorBlogCount, 'blogs');
};

const mostLikes = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author');

  const authorLikesCount = _.map(groupByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }));

  return _.maxBy(authorLikesCount, 'likes');
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };