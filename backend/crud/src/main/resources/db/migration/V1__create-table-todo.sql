CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    createdAt TEXT NOT NULL
);