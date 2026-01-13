import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20"
    >
      <nav className="max-w-[120rem] mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-heading text-2xl font-bold"
          >
            <span className="text-primary">TECH</span>
            <span className="text-secondary">VISION</span>
          </motion.div>
        </Link>

        <div className="flex gap-8 items-center">
          <Link to="/">
            <motion.span
              whileHover={{ color: '#00FFFF' }}
              className={`font-paragraph text-lg transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Home
            </motion.span>
          </Link>
          <Link to="/gallery">
            <motion.span
              whileHover={{ color: '#00FFFF' }}
              className={`font-paragraph text-lg transition-colors ${
                isActive('/gallery') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Gallery
            </motion.span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
