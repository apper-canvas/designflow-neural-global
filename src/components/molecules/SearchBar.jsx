import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = '',
  size = 'md'
}) => {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }
  
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  }
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={16} 
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-4 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
            transition-colors duration-200
            ${sizes[size]}
          `}
        />
      </div>
    </form>
  )
}

export default SearchBar