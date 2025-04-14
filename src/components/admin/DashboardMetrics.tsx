
import React from "react";
import { ArrowUpRight, ArrowDownRight, ShoppingCart, Users, DollarSign, Package } from "lucide-react";

export const DashboardMetrics = () => {
  // Mock data - in a real application this would come from an API
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,548",
      change: "+12%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-50 text-green-500 border-green-100"
    },
    {
      title: "Total Orders",
      value: "574",
      change: "+8%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-500 border-blue-100"
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+24%",
      isPositive: true,
      icon: Users,
      color: "bg-purple-50 text-purple-500 border-purple-100"
    },
    {
      title: "Active Products",
      value: "43",
      change: "-3%",
      isPositive: false,
      icon: Package,
      color: "bg-amber-50 text-amber-500 border-amber-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow p-5 border border-gray-100 transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">{metric.title}</p>
              <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
              <div className="flex items-center mt-2">
                {metric.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span 
                  className={`text-xs font-medium ${
                    metric.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.change} from last month
                </span>
              </div>
            </div>
            <div className={`p-2 rounded-full ${metric.color}`}>
              <metric.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
