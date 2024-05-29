"use server"
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { revalidatePath } from "next/cache";

async function openDb() {
    const db = open({
        filename: '/Users/joseviejo/curso/codecripto/northwind-SQLite3/dist/northwind.db',
        driver: sqlite3.Database
    });
    return db;
}

export async function getProducts() {
    const db = await openDb();
    const products = await db.all('select * from products');

    return products;
}

export async function getCategories() {
    const db = await openDb();
    const categories = await db.all('select CategoryID, CategoryName from categories order by 2');

    return categories;
}

export async function getSuppliers() {
    const db = await openDb();
    const suppliers = await db.all('select SupplierId, CompanyName from suppliers order by 2');

    return suppliers;
}


export async function getProduct(id: number) {
    const db = await openDb();
    const product = await db.get('select * from products where ProductID = ?', id);
    return product;
}

export async function deleteProduct(id: number) {
    const db = await openDb();
    const product = await db.run('delete  from products where ProductID = ?', id);
    revalidatePath('/products', "page")
    return true;
}


export async function addProduct(registro: any) {
    const db = await openDb();
    const ultimo = await db.get("select max(ProductID) ultimo from products")
    console.log(ultimo.ultimo)
    await db.run(`insert 

            into products 
            (ProductID,
                CategoryID, SupplierID,
                ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, 
             UnitsOnOrder, ReorderLevel, Discontinued) 
             values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             `,
        ultimo.ultimo + 1,
        registro.CategoryID, registro.SupplierID,
        registro.ProductName,
        registro.QuantityPerUnit, registro.UnitPrice,
        registro.UnitsInStock, registro.UnitsOnOrder,
        registro.ReorderLevel, registro.Discontinued
    );

    console.log(registro);
    return true;
}

export async function updateProduct(id: number, registro: any) {
    const db = await openDb();
    await db.run(`update products 
            set ProductName = ?, 
            CategoryID = ?,
            SupplierID = ?,
            QuantityPerUnit = ?, 
            UnitPrice = ?, UnitsInStock = ?, 
            UnitsOnOrder = ?, ReorderLevel = ?, Discontinued = ? 
            where ProductID = ?`,
        registro.ProductName,
        registro.CategoryID, registro.SupplierID,
        registro.QuantityPerUnit, registro.UnitPrice,
        registro.UnitsInStock, registro.UnitsOnOrder,
        registro.ReorderLevel, registro.Discontinued,
        id
    );

    console.log(registro);
    return true;
}