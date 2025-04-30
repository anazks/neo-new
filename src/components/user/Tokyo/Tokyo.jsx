import { useState, useEffect } from 'react';

export default function NeoTokyo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 500);
    
    return () => clearTimeout(expandTimer);
  }, []);
  
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
    height: 'auto',
    overflow: 'visible',
    position: 'absolute',
    top: '30%',
    left: '0',
    right: '0'
  };

  const neoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '700',
    fontFamily: '"Niveau Grotesk", sans-serif',
    letterSpacing: '0.15em',
    color: '#ffffff',
    position: 'relative',
    zIndex: '10',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(-10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block',
    textShadow: glitch ? 
      '0 0 5px #ff0022, 0 0 10px #ff0022, 0 0 20px #ff0022' : 
      '0 0 10px rgba(255,0,34,0.8), 0 0 20px rgba(255,0,34,0.6)'
  };

  const tokyoStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '700',
    fontFamily: '"Niveau Grotesk", sans-serif',
    letterSpacing: '0.15em',
    color: '#ffffff',
    position: 'relative',
    zIndex: '10',
    transition: 'all 2s cubic-bezier(0.19, 1, 0.22, 1)',
    transform: isExpanded ? 'translateX(10px) scale(1)' : 'translateX(0) scale(0)',
    opacity: isExpanded ? 1 : 0,
    display: 'inline-block',
    textShadow: glitch ? 
      '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff' : 
      '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.6)'
  };

  const taglineStyle = {
    position: 'absolute',
    bottom: '-2rem',
    width: '100%',
    textAlign: 'center',
    fontFamily: '"Raleway", sans-serif',
    fontSize: '1rem',
    fontWeight: '300',
    letterSpacing: '0.2em',
    color: '#ffffff',
    opacity: isExpanded ? 1 : 0,
    transition: 'opacity 1.5s ease 0.5s',
    textShadow: '0 0 5px rgba(255,255,255,0.5)'
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <h1 style={neoStyle}>NEO</h1>
        <h1 style={tokyoStyle}>TOKYO</h1>
        <div style={taglineStyle}>EXPERIENCE THE FUTURE</div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Niveau+Grotesk:wght@400;500;700&family=Raleway:wght@300;400;600&display=swap');
        
        @keyframes glitch {
          0% { text-shadow: 0 0 5px #ff0022, 0 0 10px #ff0022; }
          25% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
          50% { text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff; }
          75% { text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00; }
          100% { text-shadow: 0 0 5px #ff0022, 0 0 10px #ff0022; }
        }
      `}</style>
    </div>
  );
}