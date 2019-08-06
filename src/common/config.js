
// Copy built result to: ./node-server/public
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3100';

export const API_URL = BASE_URL + '/api';
export const AVATAR_URL = BASE_URL + '/upload/avatars';
export const ARTICLE_IMAGE_URL = BASE_URL + '/upload/articles/images';
export const ARTICLE_IMG_URL = BASE_URL + '/upload/articles/imgs';

export default API_URL;
