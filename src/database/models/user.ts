import {
    Sequelize,
    DataTypes
} from "sequelize";

export interface UserAttributes {
    first_name ? : string;
    last_name ? : string;
    email ? : string;

}

export interface UserInstance {
    id: number;
    created_at: Date;
    updated_at: Date;

    first_name: string;
    last_name: string;
    email: string;

}

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
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
