"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct, getCategories, getSuppliers } from "@/lib/db/products";

const formSchema = z.object({
  ProductName: z
    .string()
    .min(5, {
      message: "nombre del producto menor a 5 caracteres",
    })
    .max(30, {
      message: "nombre del producto mas de 30 caracteres",
    }),
  QuantityPerUnit: z.string(),
  UnitPrice: z.string().pipe(z.coerce.number()),
  UnitsInStock: z.string().pipe(z.coerce.number()),
  UnitsOnOrder: z.string().pipe(z.coerce.number()),
  ReorderLevel: z.string().pipe(z.coerce.number()),
  Discontinued: z.string().pipe(z.coerce.number()),
  CategoryID: z.string(),
  SupplierID: z.string(),
});

function Newrecord() {
  const [data, setData] = React.useState<any>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
      QuantityPerUnit: "",
      UnitPrice: 0,
      UnitsInStock: 0,
      UnitsOnOrder: 0,
      ReorderLevel: 0,
      Discontinued: 0,
      CategoryID: "0",
      SupplierID: "0",
    },
  });
  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      const suppliers = await getSuppliers();
      setData({ categories, suppliers });
    })();
  }, []);

  async function onSubmit(data: any) {
    console.log(data);
    await addProduct(data);
  }
  if (!data) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Products</h1>
      <Form {...form}>
        <form
          className="w-1/2 space-y-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="CategoryID"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category ID</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category ID" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category ID</SelectLabel>
                        {data?.categories.map(
                          (category: any, index: number) => (
                            <SelectItem
                              key={index}
                              value={category.CategoryID.toString()}
                            >
                              {category.CategoryID.toString()}{" "}
                              {category.CategoryName}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="SupplierID"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Supplier ID" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Supplier ID</SelectLabel>
                        {data?.suppliers.map((supplier: any, index: number) => (
                          <SelectItem
                            key={index}
                            value={supplier.SupplierID.toString()}
                          >
                            {supplier.SupplierID.toString()} -{" "}
                            {supplier.CompanyName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="ProductName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>DESCRIPCION DEL PRODUCTO</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="QuantityPerUnit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity per unit</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Quantity per unit</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between space-x-2">
            <FormField
              name="UnitPrice"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Precio por unidad</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="UnitsInStock"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>UnitsInStock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>UnitsInStock</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row  space-x-2">
            <FormField
              name="UnitsOnOrder"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UnitsOnOrder</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>UnitsOnOrder</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="ReorderLevel"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ReorderLevel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>ReorderLevel</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="Discontinued"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discontinued</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Discontinued</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {JSON.stringify(form.formState.errors, null, 2)}
      </Form>
    </div>
  );
}

export default Newrecord;
