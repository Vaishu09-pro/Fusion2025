import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20 mt-32">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
              TECHVISION
            </h3>
            <p className="font-paragraph text-base text-foreground">
              Skills Academy - Empowering innovation through technology and collaboration.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-secondary mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-base">contact@techvision.edu</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-base">College Campus, Tech Building</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-xl font-bold text-secondary mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#00FFFF' }}
                className="text-foreground font-paragraph text-base transition-colors"
              >
                Twitter
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#00FFFF' }}
                className="text-foreground font-paragraph text-base transition-colors"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#00FFFF' }}
                className="text-foreground font-paragraph text-base transition-colors"
              >
                Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-primary/20 text-center"
        >
          <p className="font-paragraph text-base text-foreground">
            © 2026 TechVision Skills Academy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
