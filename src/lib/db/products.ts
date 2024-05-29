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



export async function getProduct(id: number) {
    const db = await openDb();
    const product = await db.get('select * from products where ProductID = ?', id);
    return product;
}

