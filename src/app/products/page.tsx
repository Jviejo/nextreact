import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/db/products";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AlertModal from "@/components/AlertModal";
import { deleteProduct } from "@/lib/db/products";
export default async function Products() {
  // select * from products

  const productos = await getProducts();
  return (
    <div>
      <h1>Products</h1>
      <Link href="/products/new">
        <Button>Add</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
              <TableCell className=" space-x-2">
              <Link href={`/products/${producto.ProductID}/update`}>
                  <Button>Edit</Button>
                </Link>
                
                <Link href={`/products/${producto.ProductID}/delete`}>
                  <Button>Delete</Button>
                </Link>
                
              </TableCell>
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
