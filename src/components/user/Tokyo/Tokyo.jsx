import { useState, useEffect } from 'react';

export default function NeoTokyo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [glitch, setGlitch] = useState(false);
  
  // Initial expansion animation on mount
  useEffect(() => {
    // Start expansion after a short delay
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 500);
    
    return () => clearTimeout(expandTimer);
  }, []);
  
  // Recurring glitch animation effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto', // Changed from 100vh to auto
    overflow: 'visible', // Changed from hidden to visible
    fontFamily: '"Orbitron", "Blade Runner", "Cyberpunk", sans-serif',
    position: 'absolute', // Added absolute positioning
    top: '60%', // Position it at 60% from the top
    left: '0',
    right: '0'
  };

  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  };

  const titleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible'
  };

  const neoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '900',
    letterSpacing: '0.15em',
    color: glitch ? '#ff0022' : '#ffffff',
    position: 'relative',
    zIndex: '10',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(-10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block',
    textShadow: glitch ? 
      '2px 2px 0px rgba(255,0,0,0.7), -2px -2px 0px rgba(0,255,255,0.7)' : 
      '0 0 10px rgba(255,0,0,0.8)'
  };

  const tokyoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '900',
    letterSpacing: '0.15em',
    color: glitch ? '#ff0022' : '#ffffff',
    position: 'relative',
    zIndex: '10',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block',
    textShadow: glitch ? 
      '2px 2px 0px rgba(255,0,0,0.7), -2px -2px 0px rgba(0,255,255,0.7)' : 
      '0 0 10px rgba(255,0,0,0.8)'
  };

  const lineStyle = {
    position: 'absolute',
    height: '4px',
    backgroundColor: '#ff0022',
    bottom: '0',
    left: '50%',
    width: isExpanded ? '100%' : '0%',
    transform: 'translateX(-50%)',
    transition: 'width 2.5s cubic-bezier(0.19, 1, 0.22, 1)',
    animation: glitch ? 'pulse 1s infinite' : 'none'
  };

  const glowStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '0',
    opacity: '0.3'
  };

  const glowNeoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '900',
    letterSpacing: '0.15em',
    color: '#ff0022',
    filter: 'blur(10px)',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(-10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block'
  };

  const glowTokyoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '900',
    letterSpacing: '0.15em',
    color: '#ff0022',
    filter: 'blur(10px)',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block'
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={titleContainerStyle}>
          {/* Main text split into NEO and TOKYO */}
          <h1 style={neoStyle}>NEO</h1>
          <h1 style={tokyoStyle}>TOKYO</h1>
          
          {/* Red line underneath */}
          <div style={lineStyle}></div>
        </div>
        
        {/* Text shadow/glow effect as background */}
        <div style={glowStyle}>
          <div style={titleContainerStyle}>
            <span style={glowNeoStyle}>NEO</span>
            <span style={glowTokyoStyle}>TOKYO</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: 'Cyberpunk';
          src: url('https://fonts.cdnfonts.com/css/cyberpunk');
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}