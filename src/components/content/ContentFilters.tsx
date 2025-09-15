import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setFilter } from '@/store/slices/contentSlice';
import { FileText, Clock, CheckCircle, Eye } from 'lucide-react';

const filters = [
  { key: 'all' as const, label: 'All Content', icon: Eye },
  { key: 'requested' as const, label: 'Requested', icon: FileText },
  { key: 'in-progress' as const, label: 'In Progress', icon: Clock },
  { key: 'published' as const, label: 'Published', icon: CheckCircle },
];

const ContentFilters = () => {
  const dispatch = useDispatch();
  const { filter, items } = useSelector((state: RootState) => state.content);

  const getFilterCount = (filterKey: typeof filter) => {
    if (filterKey === 'all') return items.length;
    return items.filter(item => item.status === filterKey).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {filters.map(({ key, label, icon: Icon }) => {
        const isActive = filter === key;
        const count = getFilterCount(key);
        
        return (
          <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={isActive ? "default" : "secondary"}
              size="sm"
              onClick={() => dispatch(setFilter(key))}
              className={`relative h-9 px-4 ${
                isActive 
                  ? 'bg-gradient-primary hover:shadow-hover' 
                  : 'hover:bg-content-hover'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
              <Badge 
                variant={isActive ? "secondary" : "outline"}
                className={`ml-2 h-5 text-xs ${
                  isActive 
                    ? 'bg-white/20 text-primary-foreground border-white/20' 
                    : ''
                }`}
              >
                {count}
              </Badge>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ContentFilters;