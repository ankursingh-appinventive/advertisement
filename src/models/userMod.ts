import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configuration/config';
// import {Address} from './addressMod';

class User extends Model{
    public id!: number;
    public username!: String;
    public email!: string;
    public password!: string;
    public DOB!: Date;
    public fav!: string;
    public status !: boolean;
    public profilePIC!: Blob;
    public phone_number !: number;
    public gender !: string;
}

User.init({
    id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    username:{
        type : DataTypes.STRING,
        allowNull : false,
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    },
    fav:{
        type : DataTypes.STRING,
        allowNull : false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false
    },
    profilePIC: {
        type: DataTypes.BLOB
    },
    phone_number:{
        type:DataTypes.INTEGER,
        allowNull : false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,
    modelName:'users'
});

(async () => {
    User.sync({ alter: true }) 
})();
// User.hasMany(Address,{as:'addresses', foreignKey:'user_Id'})
export default User;