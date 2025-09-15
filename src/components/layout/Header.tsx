import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, BookOpen, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchQuery } from '@/store/slices/contentSlice';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user);
  const { searchQuery } = useSelector((state: RootState) => state.content);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              ContentHub
            </span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Discover
            {isActive('/') && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </Link>
          <Link
            to="/submit"
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              isActive('/submit') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Submit Request
            {isActive('/submit') && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </Link>
          <Link
            to="/guides"
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              isActive('/guides') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Guides
            {isActive('/guides') && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {location.pathname === '/' && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </div>
          )}
          
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent text-[10px] flex items-center justify-center">
              3
            </div>
          </Button>

          <Link to="/submit">
            <Button size="sm" className="bg-gradient-primary hover:shadow-hover">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;