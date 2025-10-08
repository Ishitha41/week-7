CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Price DECIMAL(10,2),
    Quantity INT
);

-- ALTER: Add a new column
ALTER TABLE Products ADD COLUMN Category VARCHAR(30);

-- ALTER: Change datatype of Price (PostgreSQL syntax)
-- For MySQL use: ALTER TABLE Products MODIFY Price FLOAT;
ALTER TABLE Products ALTER COLUMN Price TYPE FLOAT;

-- ALTER: Drop a column
ALTER TABLE Products DROP COLUMN Quantity;

-- RENAME: Change table name
ALTER TABLE Products RENAME TO Inventory;

-- TRUNCATE: Remove all rows (structure stays)
TRUNCATE TABLE Inventory;

-- DROP: Delete the table completely
DROP TABLE IF EXISTS Inventory;