import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // VIKAAS Brand Colors
                        'primary-blue': '#1E3A8A',
                        'primary-orange': '#FF6B35',
                        'primary-white': '#FFFFFF',
                        
                        // Secondary Colors
                        'secondary-light-blue': '#DBEAFE',
                        'secondary-warm-grey': '#F3F4F6',
                        'secondary-dark-grey': '#374151',
                        'secondary-medium-grey': '#6B7280',
                        
                        // Accent Colors
                        'success-green': '#10B981',
                        'warning-yellow': '#FCD34D',
                        'danger-red': '#EF4444',
                        'info-purple': '#8B5CF6',
                        
                        // Talent Category Colors
                        'academic-blue': '#3B82F6',
                        'creative-purple': '#A855F7',
                        'leadership-orange': '#F59E0B',
                        'physical-green': '#22C55E',
                        'technical-cyan': '#06B6D4',
                        
                        // System Colors (keeping for compatibility)
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                fontFamily: {
                        'primary': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                        'heading': ['Poppins', 'sans-serif'],
                        'display': ['Montserrat', 'sans-serif'],
                },
                fontSize: {
                        'xs': ['12px', { lineHeight: '1.5' }],
                        'sm': ['14px', { lineHeight: '1.5' }],
                        'base': ['16px', { lineHeight: '1.5' }],
                        'lg': ['18px', { lineHeight: '1.5' }],
                        'xl': ['20px', { lineHeight: '1.5' }],
                        '2xl': ['24px', { lineHeight: '1.25' }],
                        '3xl': ['30px', { lineHeight: '1.25' }],
                        '4xl': ['36px', { lineHeight: '1.25' }],
                        '5xl': ['48px', { lineHeight: '1.1' }],
                        '6xl': ['60px', { lineHeight: '1.1' }],
                },
                fontWeight: {
                        'regular': '400',
                        'medium': '500',
                        'semibold': '600',
                        'bold': '700',
                        'extrabold': '800',
                },
                letterSpacing: {
                        'tight': '-0.02em',
                        'normal': '0',
                        'wide': '0.025em',
                },
                spacing: {
                        '1': '4px',
                        '2': '8px',
                        '3': '12px',
                        '4': '16px',
                        '5': '20px',
                        '6': '24px',
                        '8': '32px',
                        '10': '40px',
                        '12': '48px',
                        '16': '64px',
                        '20': '80px',
                        '24': '96px',
                },
                borderRadius: {
                        'sm': '4px',
                        'md': '8px',
                        'lg': '12px',
                        'xl': '16px',
                        '2xl': '24px',
                        'full': '9999px',
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                boxShadow: {
                        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                },
                backgroundImage: {
                        'gradient-primary': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                        'gradient-warm': 'linear-gradient(135deg, #FF6B35 0%, #FBBF24 100%)',
                        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                        'gradient-background': 'linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)',
                },
                animation: {
                        'float': 'float 3s ease-in-out infinite',
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                },
                keyframes: {
                        float: {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-10px)' },
                        }
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
