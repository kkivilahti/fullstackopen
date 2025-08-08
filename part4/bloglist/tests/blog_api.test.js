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
      assert.ok(!authors.includes('Test author'));
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

  describe('deleting a blog', () => {
    test('succeeds with valid id', async () => {
      let response = await api.get('/api/blogs');
      let blogs = response.body;
      const blogToDelete = blogs[0];
      const blogsBefore = blogs.length;

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      response = await api.get('/api/blogs');
      blogs = response.body;
      const blogsAfter = blogs.length;

      const ids = blogs.map(blog => blog.id);
      assert(!ids.includes(blogToDelete.id));
      assert.strictEqual(blogsBefore - 1, blogsAfter);
    });

    test('fails with invalid id', async () => {
      const invalidId = '123';
      await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('editing a blog', () => {
    test('succeeds with valid data', async () => {
      let response = await api.get('/api/blogs');
      let blogs = response.body;
      const blogToUpdate = blogs[0];
      const blogsBefore = blogs.length;

      const updated = { ...blogToUpdate, likes: 300 };
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updated)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      response = await api.get('/api/blogs');
      blogs = response.body;
      const blogsAfter = blogs.length;
      const updatedBlog = blogs.find(blog => blog.id === blogToUpdate.id);

      assert.strictEqual(blogsBefore, blogsAfter);
      assert.strictEqual(updatedBlog.likes, 300);
    });

    test('fails when required fields are empty', async () => {
      let response = await api.get('/api/blogs');
      let blogs = response.body;
      const blogToUpdate = blogs[0];

      const updated = { ...blogToUpdate, title: '', url: '' };
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updated)
        .expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});