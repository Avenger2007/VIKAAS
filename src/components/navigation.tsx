'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Phone, 
  ArrowRight,
  Brain,
  Users,
  GraduationCap,
  BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '/', icon: GraduationCap },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Features', href: '/features', icon: Brain },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="w-10 h-10 relative flex items-center justify-center transition-transform duration-200 hover:scale-110"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/logo.png"
                  alt="VIKAAS Logo"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                VIKAAS
              </span>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        active
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                      {active && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          layoutId="activeTab"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

  

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">VIKAAS</span>
                  </Link>

                  <nav className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
                    {navigation.map((item, idx) => {
                      const Icon = item.icon
                      const active = isActive(item.href)

                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              active
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                            {active && (
                              <Badge variant="secondary" className="ml-auto">
                                Active
                              </Badge>
                            )}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>

  
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Bottom Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-around py-2">
          {navigation.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  <motion.div
                    className={`p-2 rounded-lg transition-colors ${active ? 'bg-blue-50' : ''}`}
                    animate={active ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}