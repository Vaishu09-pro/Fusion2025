import { motion } from 'framer-motion';

export default function CircuitBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <motion.line
              x1="0"
              y1="50"
              x2="200"
              y2="50"
              stroke="#00FFFF"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <line x1="0" y1="150" x2="200" y2="150" stroke="#00FFFF" strokeWidth="1" opacity="0.5" />
            
            {/* Vertical lines */}
            <line x1="50" y1="0" x2="50" y2="200" stroke="#FF8C00" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="#FF8C00" strokeWidth="1" opacity="0.5" />
            
            {/* Circuit nodes */}
            <circle cx="50" cy="50" r="3" fill="#00FFFF" />
            <circle cx="150" cy="50" r="3" fill="#FF8C00" />
            <circle cx="50" cy="150" r="3" fill="#FF8C00" />
            <circle cx="150" cy="150" r="3" fill="#00FFFF" />
            
            {/* Diagonal connections */}
            <line x1="50" y1="50" x2="100" y2="100" stroke="#00FFFF" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="50" x2="100" y2="100" stroke="#FF8C00" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
