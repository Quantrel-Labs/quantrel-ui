import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Download,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2
} from "lucide-react"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending"
  description: string
}

interface Transaction {
  id: string
  date: string
  type: "credit" | "debit"
  amount: number
  description: string
  balance: number
}

export default function Billing() {
  const [balance] = useState(245.80)
  const [monthlySpend] = useState(154.20)
  const [creditsUsed] = useState(7540)

  const [invoices] = useState<Invoice[]>([
    { id: "INV-001", date: "Jan 15, 2025", amount: 150.00, status: "paid", description: "API Usage - December" },
    { id: "INV-002", date: "Dec 15, 2024", amount: 175.50, status: "paid", description: "API Usage - November" },
    { id: "INV-003", date: "Nov 15, 2024", amount: 132.25, status: "paid", description: "API Usage - October" }
  ])

  const [transactions] = useState<Transaction[]>([
    { id: "1", date: "Jan 20, 2025", type: "credit", amount: 100.00, description: "Credit purchase", balance: 245.80 },
    { id: "2", date: "Jan 18, 2025", type: "debit", amount: 12.50, description: "GPT-4 API usage", balance: 145.80 },
    { id: "3", date: "Jan 15, 2025", type: "debit", amount: 8.30, description: "DALL-E image generation", balance: 158.30 },
    { id: "4", date: "Jan 12, 2025", type: "credit", amount: 50.00, description: "Credit purchase", balance: 166.60 },
    { id: "5", date: "Jan 10, 2025", type: "debit", amount: 15.75, description: "Claude API usage", balance: 116.60 }
  ])

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Billing & Credits
          </h1>
          <p className="text-xl text-gray-400">
            Manage your credits and view transaction history
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Current Balance */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-400 font-medium">Current Balance</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${balance.toFixed(2)}
            </div>
            <Button className="w-full mt-4 rounded-xl bg-white text-black hover:bg-gray-100">
              Add Credits
            </Button>
          </div>

          {/* Monthly Spend */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-gray-400 font-medium">This Month</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${monthlySpend.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">
              <span className="text-green-400">↓ 12%</span> vs last month
            </p>
          </div>

          {/* Credits Used */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Credits Used</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {creditsUsed.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">
              Last 30 days
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "credit" 
                          ? "bg-green-500/10" 
                          : "bg-red-500/10"
                      }`}>
                        {transaction.type === "credit" ? (
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === "credit" ? "text-green-400" : "text-red-400"
                      }`}>
                        {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Balance: ${transaction.balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Invoices</h2>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-sm text-gray-500 mt-1">{invoice.date}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        invoice.status === "paid"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {invoice.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <p className="text-sm text-gray-400">{invoice.description}</p>
                      <p className="text-xl font-bold text-white mt-1">
                        ${invoice.amount.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-400 mt-1">Expires 12/25</p>
                  </div>
                </div>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  Default
                </Badge>
              </div>
            </div>

            <button className="p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-white">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Add Payment Method</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
