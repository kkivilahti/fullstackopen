const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const testDataList = require('./testdata').listWithManyBlogs;
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

// clear database and set new data before each test
beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(testDataList);
});

describe('with initial data saved', () => {
  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, testDataList.length);
  });

  test('returns id in correct form', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    assert.ok(blogs.length > 0);

    const blog = blogs[1];
    assert.ok('id' in blog);
    assert.ok(!('_id' in blog));
  });

  describe('adding a blog', () => {
    test('succeeds with valid data', async () => {
      let response = await api.get('/api/blogs');
      const blogsBefore = response.body.length;

      const newBlog = { title: 'Test blog', author: 'Test author', url: 'www.google.com', likes: 2 };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      response = await api.get('/api/blogs');
      const blogsAfter = response.body.length;
      const titles = response.body.map(blog => blog.title);

      assert.strictEqual(blogsBefore + 1, blogsAfter);
      assert.ok(titles.includes('Test blog'));
    });

    test('fails when title and url are missing', async () => {
      const newBlog = { author: 'Test author', likes: 5 };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const response = await api.get('/api/blogs');
      const authors = response.body.map(blog => blog.author);

      assert.strictEqual(response.body.length, testDataList.length);
      assert.ok(!(authors.includes('Test author')));
    });

    test('defaults likes to zero if not defined', async () => {
      const newBlog = { title: 'Test blog', author: 'Test author', url: 'www.google.com' };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');
      const blogs = response.body;
      const newestBlog = blogs[blogs.length - 1];

      assert.ok('likes' in newestBlog);
      assert.strictEqual(newestBlog.likes, 0);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});