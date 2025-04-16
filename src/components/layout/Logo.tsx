
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
        <path 
          d="M7 8L13 8C15.2091 8 17 9.79086 17 12C17 14.2091 15.2091 16 13 16L7 16L7 8Z" 
          fill="currentColor" 
          fillOpacity="0.3" 
        />
        <path 
          d="M7 16L13 16L19 24L13 24L7 16Z" 
          fill="currentColor" 
        />
        <path 
          d="M23 13L25 10L27 13L25 16L23 13Z" 
          fill="currentColor" 
        />
        <path 
          d="M21 16L23 19L25 16L23 13L21 16Z" 
          fill="currentColor" 
          fillOpacity="0.7" 
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-serif font-medium text-lg leading-tight">Maroov</span>
        <span className="text-xs text-muted-foreground leading-none">maroof 7</span>
      </div>
    </Link>
  );
};

export default Logo;
