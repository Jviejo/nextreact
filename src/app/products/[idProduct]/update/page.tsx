"use client";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  updateProduct,
  getProduct,
  getCategories,
  getSuppliers,
} from "@/lib/db/products";
import { useParams } from "next/navigation";
import { Cat } from "lucide-react";

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

function UpdateRecord() {
  const [state, setState] = useState("loading");
  const [data, setData] = useState<any>({});
  const params = useParams();
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
    getProduct(parseInt(params.idProduct as string)).then(async (data) => {
      const categories = await getCategories();
      const suppliers = await getSuppliers();
      console.log(categories, suppliers, data);
      setData({ categories, suppliers });
      console.log(data);
      form.setValue("CategoryID", data.CategoryID.toString());
      form.setValue("SupplierID", data.SupplierID.toString());
      form.setValue("ProductName", data.ProductName);
      form.setValue("QuantityPerUnit", data.QuantityPerUnit);
      form.setValue("UnitPrice", data.UnitPrice.toString());
      form.setValue("UnitsInStock", data.UnitsInStock.toString());
      form.setValue("UnitsOnOrder", data.UnitsOnOrder.toString());
      form.setValue("ReorderLevel", data.ReorderLevel.toString());
      form.setValue("Discontinued", data.Discontinued);
      setState("cargado");
    });
  }, []);

  async function onSubmit(data: any) {
    setState("send");
    await updateProduct(parseInt(params.idProduct as string), data);
    setState("actualizado");
  }

  if (state == "loading") return <h1>Cargando</h1>;
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
                <FormDescription>Product name</FormDescription>
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
          <Button
            disabled={
              state == "send" ||
              state == "actualizado" ||
              !form.formState.isDirty
            }
            type="submit"
          >
            Submit
          </Button>
        </form>
        {/* {JSON.stringify(form.formState.isDirty, null, 2)} */}

        {state == "actualizado" && (
          <Alert className="mt-3 flex justify-between ">
            <div>
              <AlertTitle>Registro actualizado</AlertTitle>
              <AlertDescription>
                Actualizado satisfactoriamente
              </AlertDescription>
            </div>
            <Button onClick={() => setState("modificando")}>X</Button>
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default UpdateRecord;
