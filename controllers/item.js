import Item from '../models/Item.js';
import Category from '../models/Category.js';
import cloudinary from '../utils/cloudinary.js';

const controller = {
  getIndex: async (req, res) => {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render(`items/list`, { title: 'Item list', items });
  },

  getAdd: async (req, res) => {
    const categories = await Category.find();
    res.render(`items/add`, { title: 'New item', categories });
  },

  postAdd: async (req, res) => {
    try {
      // upload photo
      const result = await cloudinary.uploader.upload(req.file.path);

      // save data
      const data = req.body;
      data.photo = result.secure_url;
      const item = new Item(data);
      await item.save();

      // response
      res.redirect(`/items/${item.id}`);
    } catch (e) {
      console.log(e);
    }
  },

  getDetails: async (req, res) => {
    const item = await Item.findById(req.params.id).populate('category');
    res.render(`items/details`, { title: 'Item details', item });
  },

  delete: async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/items' });
  },

  getEdit: async (req, res) => {
    const item = await Item.findById(req.params.id);
    const categories = await Category.find();
    res.render('items/edit', { title: 'Edit item', item, categories });
  },

  postEdit: async (req, res) => {
    try {
      // upload file
      const result = await cloudinary.uploader.upload(req.body.photo);
      req.body.photo = result.secure_url;

      // save to db
      const id = req.params.id;
      await Item.findByIdAndUpdate(id, req.body);
      res.json({ id });
    } catch (err) {
      console.log(err);
    }
  },
};

export default controller;
