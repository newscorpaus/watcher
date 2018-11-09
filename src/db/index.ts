let db: any = {};

function update (data: any) {
    db = data;
}

function data (): any {
    return db;
}

export { db, update };
