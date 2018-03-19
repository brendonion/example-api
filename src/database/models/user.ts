import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface UserAttributes {
    first_name ? : string;
    last_name ? : string;
    email ? : string;

}

export interface UserInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    first_name: string;
    last_name: string;
    email: string;

}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
    var user = sequelize.define('user', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING
    });

    user.associate = function(models) {
        // associations can be defined here
    };

    return user;
};
