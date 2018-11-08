import { generator } from './update';
import { v4 } from 'uuid';

const articleId = (process.env.ARTICLE_ID || v4());
let n = process.env.TIMES || 8;

n = parseInt(<string>n);

generator(n, articleId, (err: Error) => {
    if (err) {
        console.log('err: ', err);
    }

    console.log('Done generating for ', articleId);
});
