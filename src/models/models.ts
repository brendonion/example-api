import sequelize from '../services/postgresService';
import { initPostModel } from './postModel';

export const PostModel = initPostModel(sequelize);
