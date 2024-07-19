import Category from '../models/Category.js';

const controller = {
  getIndex: async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('categories/list', { title: 'Category list', categories });
  },

  getDetails: async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('categories/details', { title: 'Category details', category });
  },

  getAdd: (req, res) => {
    res.render('categories/add', { title: 'New category' });
  },

  postAdd: async (req, res) => {
    // add category
    const category = new Category(req.body);
    await category.save();

    // redirect
    res.redirect(`/categories/${category.id}`);
  },

  getEdit: async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('categories/edit', { title: 'Edit category', category });
  },

  postEdit: async (req, res) => {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, req.body);
    res.redirect(`/categories/${id}`);
  },

  delete: async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/categories' });
  },
};

export default controller;
