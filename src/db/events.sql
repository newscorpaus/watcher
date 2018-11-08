CREATE TABLE IF NOT EXISTS ARTICLE_UPDATES(
    id SERIAL PRIMARY KEY,
    capi_id varchar(100) not null,
    event varchar(100) not null,
    workflow varchar(100) not null,
    received timestamp default NOW(),
    created varchar(300)
)