import { useState } from 'react'
import Header from '@/components/organisms/Header'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={handleMobileMenuClose}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMobileMenuToggle={handleMobileMenuToggle} />
        
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout