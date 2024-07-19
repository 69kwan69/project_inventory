import { model, Schema } from 'mongoose';

const Category = model(
  'Category',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Category;
