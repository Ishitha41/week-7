CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Category VARCHAR(30),
    Price DECIMAL(10,2),
    Quantity INT
);

-- 2. Insert sample data
INSERT INTO Products (ProductID, ProductName, Category, Price, Quantity) VALUES
(1, 'Laptop', 'Electronics', 60000, 5),
(2, 'Phone', 'Electronics', 30000, 10),
(3, 'Tablet', 'Electronics', 20000, 8),
(4, 'Shirt', 'Clothing', 1500, 20),
(5, 'Jeans', 'Clothing', 2500, 15),
(6, 'Shoes', 'Footwear', 3000, 12);

-- 3. Aggregate Functions Examples

-- COUNT: Number of products
SELECT COUNT(*) AS TotalProducts FROM Products;

-- SUM: Total quantity of all products
SELECT SUM(Quantity) AS TotalQuantity FROM Products;

-- AVG: Average price of products
SELECT AVG(Price) AS AveragePrice FROM Products;

-- MIN: Cheapest product price
SELECT MIN(Price) AS MinPrice FROM Products;

-- MAX: Costliest product price
SELECT MAX(Price) AS MaxPrice FROM Products;

-- 4. Aggregate Functions with GROUP BY

-- Total products per category
SELECT Category, COUNT(*) AS NumProducts
FROM Products
GROUP BY Category;

-- Average price per category
SELECT Category, AVG(Price) AS AvgPrice
FROM Products
GROUP BY Category;

-- Total quantity per category
SELECT Category, SUM(Quantity) AS TotalQty
FROM Products
GROUP BY Category;

-- 5. HAVING with GROUP BY (filter groups)
-- Show categories with more than 2 products
SELECT Category, COUNT(*) AS NumProducts
FROM Products
GROUP BY Category
HAVING COUNT(*) > 2;
aggeration func