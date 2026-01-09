"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Download, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

// Mock billing data
const currentPlan = {
  name: "Free",
  price: "$0",
  period: "month",
  status: "Active",
  nextBilling: "N/A",
};

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    isDefault: true,
  },
];

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-12",
    amount: "$5.00",
    status: "Paid",
    plan: "Pro Plan",
    downloadUrl: "#",
  },
  {
    id: "INV-2023-012",
    date: "2023-12-12",
    amount: "$5.00",
    status: "Paid",
    plan: "Pro Plan",
    downloadUrl: "#",
  },
  {
    id: "INV-2023-011",
    date: "2023-11-12",
    amount: "$5.00",
    status: "Paid",
    plan: "Pro Plan",
    downloadUrl: "#",
  },
  {
    id: "INV-2023-010",
    date: "2023-10-12",
    amount: "$5.00",
    status: "Paid",
    plan: "Pro Plan",
    downloadUrl: "#",
  },
];

const billingHistory = [
  {
    date: "2024-01-12",
    description: "Pro Plan - Monthly Subscription",
    amount: "$5.00",
    status: "Success",
  },
  {
    date: "2023-12-12",
    description: "Pro Plan - Monthly Subscription",
    amount: "$5.00",
    status: "Success",
  },
  {
    date: "2023-11-12",
    description: "Pro Plan - Monthly Subscription",
    amount: "$5.00",
    status: "Success",
  },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6 w-full relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Large orb top left */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.35)_0%,rgba(6,182,212,0.25)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_forwards,dropMorph_25s_ease-in-out_infinite_2s]" />

        {/* Medium orb top right */}
        <div className="absolute top-20 -right-32 h-[400px] w-[400px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.35)_0%,rgba(59,130,246,0.25)_40%,transparent_75%)] animate-[fadeInBright_1.5s_ease-out_0.3s_forwards,dropMorph_20s_ease-in-out_infinite_2.3s]" />

        {/* Large orb bottom center */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,rgba(6,182,212,0.2)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_0.6s_forwards,dropMorph_30s_ease-in-out_infinite_3s]" />
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-2 relative z-20">
        <Link
          href="/"
          className="w-fit mb-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 px-3 py-2 rounded-md relative z-20"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Billing</h1>
        <p className="text-sm text-zinc-400">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative z-10">
        {/* Current Plan Card */}
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Current Plan
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Your active subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">{currentPlan.name} Plan</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {currentPlan.status}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-zinc-100">{currentPlan.price}</p>
                <p className="text-sm text-zinc-400">per {currentPlan.period}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Next billing date:</span>
                <span className="text-zinc-100 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {currentPlan.nextBilling}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/plans">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Card */}
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-sky-500" />
              Payment Methods
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your payment information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">
                        {method.type} •••• {method.last4}
                      </p>
                      <p className="text-xs text-zinc-400">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Default
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400 text-center py-4">No payment methods added</p>
            )}

            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Card */}
      <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm relative z-10">
        <CardHeader>
          <CardTitle className="text-zinc-100 flex items-center gap-2">
            <Download className="h-5 w-5 text-cyan-500" />
            Invoices
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Invoice</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-zinc-200 font-mono">{invoice.id}</td>
                    <td className="py-3 px-4 text-sm text-zinc-400">
                      {new Date(invoice.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-300">{invoice.plan}</td>
                    <td className="py-3 px-4 text-sm text-zinc-200 font-medium">{invoice.amount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                        <CheckCircle className="h-3 w-3" />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Billing History Card */}
      <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm relative z-10">
        <CardHeader>
          <CardTitle className="text-zinc-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Billing History
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Recent transactions and charges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{transaction.description}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-100">{transaction.amount}</p>
                  <p className="text-xs text-green-400">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
