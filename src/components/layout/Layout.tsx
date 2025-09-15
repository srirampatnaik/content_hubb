import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-content-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-content-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ContentHub. Building knowledge together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;