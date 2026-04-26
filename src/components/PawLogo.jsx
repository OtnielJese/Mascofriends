import React from 'react'

/**
 * PawLogo Component
 * Modern paw print icon for Mascofriends branding
 * Can be used as a favicon or inline logo
 */
export default function PawLogo({ 
  size = 48, 
  color = '#FF4444',
  className = ''
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main paw pad (bottom center) */}
      <circle
        cx="24"
        cy="32"
        r="10"
        fill={color}
      />

      {/* Left toe */}
      <circle
        cx="10"
        cy="18"
        r="6"
        fill={color}
      />

      {/* Top left toe */}
      <circle
        cx="8"
        cy="6"
        r="5"
        fill={color}
      />

      {/* Top right toe */}
      <circle
        cx="40"
        cy="6"
        r="5"
        fill={color}
      />

      {/* Right toe */}
      <circle
        cx="38"
        cy="18"
        r="6"
        fill={color}
      />
    </svg>
  )
}
