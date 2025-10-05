import { useState } from "react"
import { 
  DollarSign, 
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Building,
  Check,
  Clock,
  AlertCircle,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  type: 'payout' | 'earning'
  description: string
}

interface PayoutMethod {
  id: string
  type: 'bank' | 'paypal' | 'stripe'
  name: string
  details: string
  isDefault: boolean
}

export default function SellerBilling() {
  const [balance] = useState({
    available: 2340.50,
    pending: 890.25,
    total: 12450.80
  })

  const [nextPayout] = useState({
    amount: 2340.50,
    date: "2024-12-15",
    status: "scheduled"
  })

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-12-01",
      amount: 2100.50,
      status: "completed",
      type: "payout",
      description: "Monthly payout - November 2024"
    },
    {
      id: "2",
      date: "2024-11-30",
      amount: 450.25,
      status: "completed",
      type: "earning",
      description: "Code Assistant Pro - API Usage"
    },
    {
      id: "3",
      date: "2024-11-29",
      amount: 320.80,
      status: "completed",
      type: "earning",
      description: "Image Analyzer - API Usage"
    },
    {
      id: "4",
      date: "2024-11-28",
      amount: 890.25,
      status: "pending",
      type: "earning",
      description: "Data Processor - API Usage"
    },
    {
      id: "5",
      date: "2024-11-01",
      amount: 1850.00,
      status: "completed",
      type: "payout",
      description: "Monthly payout - October 2024"
    }
  ])

  const [payoutMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "Bank Account",
      details: "****1234",
      isDefault: true
    },
    {
      id: "2",
      type: "paypal",
      name: "PayPal",
      details: "seller@example.com",
      isDefault: false
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getPayoutMethodIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <Building className="w-5 h-5 text-blue-400" />
      case 'paypal':
        return <CreditCard className="w-5 h-5 text-blue-400" />
      case 'stripe':
        return <CreditCard className="w-5 h-5 text-purple-400" />
      default:
        return <CreditCard className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Billing & Payouts
          </h1>
          <p className="text-xl text-gray-400">
            Manage your earnings and payout methods
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Available Balance</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${balance.available.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-green-400">
              Ready for payout
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Pending</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${balance.pending.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500">
              Processing earnings
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Earned</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${balance.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500">
              All time
            </p>
          </div>
        </div>

        {/* Next Payout */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Next Scheduled Payout</h3>
                <p className="text-gray-400 mb-4">
                  Your next payout is scheduled for {new Date(nextPayout.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">
                    ${nextPayout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {nextPayout.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Request Early Payout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transaction History */}
          <div className="lg:col-span-2 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Transaction History</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`flex items-center gap-2 ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs font-medium uppercase">
                            {transaction.status}
                          </span>
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-gray-400">
                          {transaction.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-1">
                        {transaction.description}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        transaction.type === 'earning' ? 'text-green-400' : 'text-white'
                      }`}>
                        {transaction.type === 'earning' ? '+' : '-'}${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                View All Transactions
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Payout Methods */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Payout Methods</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                + Add
              </Button>
            </div>

            <div className="space-y-4">
              {payoutMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-5 rounded-xl border transition-colors ${
                    method.isDefault
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getPayoutMethodIcon(method.type)}
                      <div>
                        <h3 className="text-white font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-400 font-mono">{method.details}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  {!method.isDefault && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs text-gray-400 hover:text-white"
                      >
                        Set as Default
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs text-gray-400 hover:text-white"
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Payout Settings */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-white font-semibold mb-4">Payout Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm mb-1">Payout Schedule</p>
                    <p className="text-gray-400 text-xs">Monthly on the 15th</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm mb-1">Minimum Payout</p>
                    <p className="text-gray-400 text-xs">$100.00</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mt-8 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Tax Information</h2>
              <p className="text-gray-400 mb-4">
                Keep your tax information up to date for accurate reporting
              </p>
            </div>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              Update Tax Info
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Tax Form</p>
              <p className="text-white font-semibold">W-9 (US)</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Tax ID</p>
              <p className="text-white font-semibold font-mono">***-**-1234</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-1">Status</p>
              <p className="text-green-400 font-semibold">Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
