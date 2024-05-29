import { getProduct } from "@/lib/db/products";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

export default async function Product({ params }: any) {
  const product = await getProduct(params.idProduct);
  return (
    <div>
      <h1>Datos del producto {params.idProduct}</h1>
      <Table className="w-1/2">
        <TableBody>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>{product.ProductID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>{product.ProductName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Quantity Per Unit</TableCell>
            <TableCell>{product.QuantityPerUnit}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unit Price</TableCell>
            <TableCell>{product.UnitPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Units In Stock</TableCell>
            <TableCell>{product.UnitsInStock}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Units On Order</TableCell>
            <TableCell>{product.UnitsOnOrder}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reorder Level</TableCell>
            <TableCell>{product.ReorderLevel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discontinued</TableCell>
            <TableCell>{product.Discontinued}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    </div>
  );
}
