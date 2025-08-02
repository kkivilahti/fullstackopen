const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { listWithOneBlog, listWithManyBlogs } = require('./testdata');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('returns zero for an empty list', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test('returns likes of the only blog in the list', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('returns sum of all likes when list has multiple blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 36);
  });
});

describe('favorites', () => {
  test('returns the only blog when list has one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    });
  });

  test('returns the blog with most likes when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    });
  });
});

describe('most blogs', () => {
  test('returns correct author when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra', blogs: 1
    });
  });

  test('returns correct author when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin', blogs: 3
    });
  });
});

describe('most likes', () => {
  test('returns correct amount of likes when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra', likes: 5
    });
  });

  test('returns correct amount of likes when list has multiple blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra', likes: 17
    });
  });
});