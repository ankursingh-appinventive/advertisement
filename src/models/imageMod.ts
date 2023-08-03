import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../configuration/config';

class Image extends Model{
    public image_id!: number;
    public product_id!: number;
    public image!: Blob;
}

Image.init({
    image_id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    product_id:{
        type : DataTypes.STRING,
        allowNull : false
    },
    image:{
        type : DataTypes.BLOB,
        allowNull : false
    },
},
{
    sequelize,
    modelName:'images'
});
(async () => {
    Image.sync({ alter: true }) 
  })();
export default Image