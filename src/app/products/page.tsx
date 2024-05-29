import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getProducts } from "@/lib/db/products";
import Link from "next/link";
export default async function Products() {
  // select * from products

  const productos = await getProducts();
  return (
    <div>
      <h1>Products</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity Per Unit</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Units In Stock</TableHead>
            <TableHead>Units On Order</TableHead>
            <TableHead>Reorder Level</TableHead>
            <TableHead>Discontinued</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((producto: any) => (
            <TableRow key={producto.ProductID}>
              <TableCell>
                <Link href={`/products/${producto.ProductID}`}>
                  {producto.ProductID}
                </Link>
              </TableCell>
              <TableCell>{producto.ProductName}</TableCell>
              <TableCell>{producto.QuantityPerUnit}</TableCell>
              <TableCell>{producto.UnitPrice}</TableCell>
              <TableCell>{producto.UnitsInStock}</TableCell>
              <TableCell>{producto.UnitsOnOrder}</TableCell>
              <TableCell>{producto.ReorderLevel}</TableCell>
              <TableCell>{producto.Discontinued}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
