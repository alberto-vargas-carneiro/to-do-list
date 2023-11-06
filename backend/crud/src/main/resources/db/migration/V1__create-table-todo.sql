CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    createdby TEXT,
    createdAt TEXT NOT NULL
);