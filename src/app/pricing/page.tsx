'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Check, 
  X, 
  Star,
  Users,
  School,
  Building,
  Crown,
  Zap,
  Shield,
  Headphones,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for small schools getting started",
    price: "₹4,999",
    period: "per month",
    icon: School,
    color: "blue",
    popular: false,
    features: [
      "Up to 200 students",
      "Basic talent analysis",
      "3 teacher accounts",
      "Monthly reports",
      "Email support",
      "Mobile app access"
    ],
    notIncluded: [
      "Advanced AI insights",
      "Priority support",
      "Custom integrations",
      "API access"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing schools with advanced needs",
    price: "₹9,999",
    period: "per month",
    icon: Building,
    color: "purple",
    popular: true,
    features: [
      "Up to 1,000 students",
      "Advanced AI analysis",
      "10 teacher accounts",
      "Weekly reports",
      "Priority email & phone support",
      "Mobile app access",
      "Parent portal",
      "Career guidance module"
    ],
    notIncluded: [
      "Custom integrations",
      "API access",
      "Dedicated account manager"
    ]
  },
  {
    name: "Enterprise",
    description: "Complete solution for large school networks",
    price: "Custom",
    period: "contact us",
    icon: Crown,
    color: "orange",
    popular: false,
    features: [
      "Unlimited students",
      "Premium AI analysis",
      "Unlimited teacher accounts",
      "Real-time reports",
      "24/7 dedicated support",
      "Mobile app access",
      "Parent portal",
      "Career guidance module",
      "Custom integrations",
      "API access",
      "Dedicated account manager",
      "On-site training"
    ],
    notIncluded: []
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Pricing Plans
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Growth Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Flexible pricing designed to scale with your school's needs. 
              Start small and grow as you discover more student potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg">
                  View Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const Icon = plan.icon
                return (
                  <motion.div key={index} variants={fadeIn} className="relative">
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <Card className={`h-full relative ${
                      plan.popular 
                        ? 'border-2 border-purple-500 shadow-xl scale-105' 
                        : 'border border-gray-200 shadow-lg'
                    }`}>
                      <CardHeader className="text-center pb-8">
                        <div className={`w-16 h-16 bg-${plan.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`h-8 w-8 text-${plan.color}-600`} />
                        </div>
                        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                          {plan.description}
                        </CardDescription>
                        <div className="mt-6">
                          <div className="text-4xl font-bold text-gray-900">
                            {plan.price}
                          </div>
                          <div className="text-gray-500">
                            {plan.period}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start space-x-3">
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                          {plan.notIncluded.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start space-x-3 opacity-50">
                              <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className={`w-full mt-8 ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                              : 'bg-gray-900 hover:bg-gray-800'
                          }`}
                        >
                          {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Compare All Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See exactly what's included in each plan
              </p>
            </motion.div>

            <Card>
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4">Feature</th>
                        <th className="text-center py-4 px-4">Starter</th>
                        <th className="text-center py-4 px-4">Professional</th>
                        <th className="text-center py-4 px-4">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Student Capacity", starter: "200", professional: "1,000", enterprise: "Unlimited" },
                        { feature: "AI Analysis", starter: "Basic", professional: "Advanced", enterprise: "Premium" },
                        { feature: "Teacher Accounts", starter: "3", professional: "10", enterprise: "Unlimited" },
                        { feature: "Report Frequency", starter: "Monthly", professional: "Weekly", enterprise: "Real-time" },
                        { feature: "Support", starter: "Email", professional: "Priority", enterprise: "24/7 Dedicated" },
                        { feature: "Mobile App", starter: "✓", professional: "✓", enterprise: "✓" },
                        { feature: "Parent Portal", starter: "✗", professional: "✓", enterprise: "✓" },
                        { feature: "Career Guidance", starter: "✗", professional: "✓", enterprise: "✓" },
                        { feature: "API Access", starter: "✗", professional: "✗", enterprise: "✓" },
                        { feature: "Custom Integrations", starter: "✗", professional: "✗", enterprise: "✓" },
                        { feature: "Account Manager", starter: "✗", professional: "✗", enterprise: "✓" },
                        { feature: "On-site Training", starter: "✗", professional: "✗", enterprise: "✓" }
                      ].map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium">{row.feature}</td>
                          <td className="text-center py-4 px-4">{row.starter}</td>
                          <td className="text-center py-4 px-4">{row.professional}</td>
                          <td className="text-center py-4 px-4">{row.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about VIKAAS pricing
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "We offer a 30-day free trial for all plans. No credit card required to start your trial."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, UPI, and bank transfers. Annual payments get a 20% discount."
                },
                {
                  question: "Do you offer discounts for multiple schools?",
                  answer: "Yes! We offer special pricing for school groups and educational trusts. Contact our sales team for custom pricing."
                },
                {
                  question: "Is my data secure?",
                  answer: "Absolutely! We use industry-standard encryption and comply with all data protection regulations. Your data is always safe with us."
                }
              ].map((faq, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of schools already using VIKAAS to discover student potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}