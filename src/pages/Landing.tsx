// DOCS: Landing page component

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Landing() {
  const features = [
    {
      title: "For AI Developers",
      description: "Monitor usage, track performance, and manage API integrations",
      icon: "🤖",
      features: ["API usage monitoring", "Performance analytics", "Model favorites", "Credit management"],
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "For AI Providers",
      description: "Publish your models and grow your AI business",
      icon: "🧠",
      features: ["Model publishing", "Usage analytics", "Revenue tracking", "Developer support"],
      color: "from-green-50 to-green-100"
    },
    {
      title: "For Platform Admins",
      description: "Oversee the AI marketplace with comprehensive tools",
      icon: "⚙️",
      features: ["User management", "Model oversight", "Platform analytics", "System settings"],
      color: "from-purple-50 to-purple-100"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              🤖 AI Model & Agent Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              The Future of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AI Integration
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover, integrate, and publish AI models and agents. Whether you're developing with AI, 
              creating AI solutions, or managing the platform - we have the tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your AI Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each role provides specialized tools and dashboards tailored for your AI development, deployment, and management needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className={`bg-gradient-to-br ${feature.color} border-0 hover:shadow-lg transition-shadow duration-300`}>
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <p className="text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting started is simple and takes less than 2 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and choose your role - customer, store owner, or let us make you an admin</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify Email</h3>
              <p className="text-gray-600">Confirm your email address to secure your account and unlock all features</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Dashboard</h3>
              <p className="text-gray-600">Get redirected to your personalized dashboard with role-specific features and tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already enjoying our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}