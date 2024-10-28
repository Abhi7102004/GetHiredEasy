import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99], 
        when: "beforeChildren",
        staggerChildren: 0.4
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      className="py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
        <hr/>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div variants={childVariants} className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Job Hunt</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Find your dream job with us. We connect talented professionals with top companies.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {currentYear} Your Company. All rights reserved.</p>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Jobs', 'Companies', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail size={18} className="mr-2" /> info@gethiredeasy.com
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone size={18} className="mr-2" /> +91 123-123-4567
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="mr-2" /> 123 Job Street, Career City, 12345
              </li>
            </ul>
          </motion.div>
          <motion.div variants={childVariants}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;