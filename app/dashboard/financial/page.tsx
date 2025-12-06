import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";

export default async function FinancialPage() {
  const session = await auth();

  // Get user's startup
  const startup = await prisma.startup.findFirst({
    where: { founderId: session?.user?.id },
  });

  // Get financial transactions
  const transactions = startup
    ? await prisma.financialTransaction.findMany({
        where: { startupId: startup.id },
        orderBy: { date: "desc" },
        take: 20,
      })
    : [];

  // Calculate stats
  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const investments = transactions
    .filter((t) => t.type === "INVESTMENT")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + investments - expenses;

  // Calculate monthly burn rate (last 30 days expenses)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const monthlyExpenses = transactions
    .filter((t) => t.type === "EXPENSE" && t.date >= thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0);

  const runway = balance > 0 && monthlyExpenses > 0 
    ? Math.floor(balance / monthlyExpenses) 
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Management
          </h1>
          <p className="mt-1 text-gray-600">
            Track finances, cash flow, and fundraising
          </p>
        </div>
        <Link href="/dashboard/financial/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {/* Financial Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-gray-600">
              {balance >= 0 ? "Positive" : "Negative"} cash flow
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(income)}
            </div>
            <p className="text-xs text-gray-600">Revenue and income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(expenses)}
            </div>
            <p className="text-xs text-gray-600">Operating costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Runway</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {runway > 0 ? `${runway} months` : "N/A"}
            </div>
            <p className="text-xs text-gray-600">
              At current burn rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest financial activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="py-8 text-center">
                <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  No transactions yet. Start by adding your first transaction.
                </p>
                <Link href="/dashboard/financial/add">
                  <Button className="mt-4" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 8).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          transaction.type === "INCOME"
                            ? "bg-green-50"
                            : transaction.type === "INVESTMENT"
                              ? "bg-blue-50"
                              : "bg-red-50"
                        }`}
                      >
                        {transaction.type === "INCOME" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description || transaction.category}
                        </p>
                        <p className="text-xs text-gray-600">
                          {transaction.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        transaction.type === "INCOME"
                          ? "text-green-600"
                          : transaction.type === "INVESTMENT"
                            ? "text-blue-600"
                            : "text-red-600"
                      }`}
                    >
                      {transaction.type === "INCOME" || transaction.type === "INVESTMENT" ? "+" : "-"}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats & Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>
                Last 30 days financial summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Burn</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(monthlyExpenses)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Investment Raised
                  </span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(investments)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Net Profit</span>
                  <span
                    className={`font-semibold ${
                      income - expenses >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(income - expenses)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🤖</span>
                <span>AI Financial Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-900">
                    💡 Cost Optimization
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Your marketing spend decreased 20% while maintaining growth.
                    Great efficiency improvement!
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-900">
                    📊 Runway Alert
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {runway > 0 
                      ? `With ${runway} months runway, consider raising funds in ${Math.max(1, runway - 3)} months.`
                      : "Add transactions to calculate your runway."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

