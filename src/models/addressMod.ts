import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../configuration/config';
import User from './userMod';

class Address extends Model{
    public address_id: number;
    public user_Id: number;
    public houseNo: String;
    public street : string;
    public area: string;
    public landmark: string;
    public district: string;
    public city : boolean;
    public state : string;
    public country : number;
    public zip : number;
    public address_type : string;
    public status : boolean;
    public createdAt : Date;
    public updatedAt : Date;
}

Address.init({
    address_id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    user_Id:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    houseNo:{
        type : DataTypes.STRING,
        allowNull : false
    },
    street:{
        type : DataTypes.STRING,
        allowNull : false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address_type: {
        type: DataTypes.STRING,
        defaultValue: true
    },
    status: {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
},
{
    sequelize,
    modelName:'addresses'
});
(async () => {
    Address.sync({ alter: true }) 
  })();


// User.hasMany(Address,{foreignKey:'Id'})
export {
    Address
} 