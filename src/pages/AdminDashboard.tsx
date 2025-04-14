
import React from "react";
import { Layout } from "@/components/admin/Layout";
import { DashboardMetrics } from "@/components/admin/DashboardMetrics";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { CategoryDistribution } from "@/components/admin/CategoryDistribution";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="p-6 transition-colors duration-200">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RevenueChart />
          <OrdersChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="col-span-1">
            <CategoryDistribution />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ProductsTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
