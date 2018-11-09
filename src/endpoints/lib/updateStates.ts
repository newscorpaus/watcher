import { keys, filter } from 'ramda';
import * as moment from 'moment';
import { db } from './../../db';

const updateStates = () => {
    const articleIds = keys(db);

    const updater = (articleId: string) => {
        const article = db[articleId];
        if (article.status == 'complete') {
            return;
        }

        const lastEvent = article.events[article.events.length - 1];
        const then = moment(lastEvent.received);
        const fiveMinutesAgo = moment().subtract(30, 'seconds');

        if (then.isBefore(fiveMinutesAgo)) {
            article.status = 'failed';
        }
    };

    articleIds.forEach(updater);
};

export { updateStates };
