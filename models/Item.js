import { model, Schema, SchemaType } from 'mongoose';

const Item = model(
  'Item',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Item;
