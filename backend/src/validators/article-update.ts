import { workflow } from './../workflows/update';

const validator = (rows: any[]): object => {
    // dodgy fast as invalidation

    const valid = rows.length % workflow.length == 0;
    return {
        valid: valid,
        events: rows
    };
};

export { validator };
