import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../configuration/config';

class Product extends Model{
    public product_id: number;
    public user_id: number;
    public category_id: number;
    public productName: String;
    public Description : string;
    public basePrice: number;
    public bidder_id : number;
    public bid_price : number;
    public address_id : number;
    public status : boolean;
}

Product.init({
    product_id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productName:{
        type : DataTypes.STRING,
        allowNull : false
    },
    Description:{
        type : DataTypes.STRING,
        allowNull : false
    },
    basePrice:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    bidder_id: {
        type: DataTypes.INTEGER
    },
    bid_price: {
        type: DataTypes.INTEGER
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},
{
    sequelize,
    modelName:'products'
});
(async () => {
    Product.sync({ alter: true }) 
  })();

export default Product