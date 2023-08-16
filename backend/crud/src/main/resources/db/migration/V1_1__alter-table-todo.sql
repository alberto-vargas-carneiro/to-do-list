ALTER TABLE todo
RENAME COLUMN title TO content;

ALTER TABLE todo
ADD createdby VARCHAR(255) NOT NULL,
DROP COLUMN description;