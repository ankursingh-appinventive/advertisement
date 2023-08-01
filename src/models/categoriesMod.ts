import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../configuration/config';

class Category extends Model{
    public category_id: number;
    public categoryName: String;
    public SubCategory : String;
}

Category.init({
    category_id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    categoryName:{
        type : DataTypes.STRING,
        allowNull : false
    },
    SubCategory:{
        type : DataTypes.STRING,
        allowNull : false
    },
},
{
    sequelize,
    modelName:'categories'
});
(async () => {
    Category.sync({ alter: true }) 
  })();

export default Category