
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export const ProductsTable = () => {
  // Mock data - in a real application, this would come from an API
  const products = [
    {
      id: "1",
      name: "Modern Sofa",
      category: "Furniture",
      price: 799.99,
      stock: 12,
      status: "In Stock",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      stock: 8,
      status: "In Stock",
    },
    {
      id: "3",
      name: "Cotton T-Shirt",
      category: "Clothing",
      price: 29.99,
      stock: 45,
      status: "In Stock",
    },
    {
      id: "4",
      name: "Kitchen Blender",
      category: "Appliances",
      price: 89.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "5",
      name: "Smartphone",
      category: "Electronics",
      price: 899.99,
      stock: 5,
      status: "In Stock",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === "In Stock" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
