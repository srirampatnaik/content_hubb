import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setItems, setLoading } from '@/store/slices/contentSlice';
import { useContentQuery } from '@/hooks/useContentQuery';
import ContentCard from '@/components/content/ContentCard';
import ContentFilters from '@/components/content/ContentFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, BookOpen, Zap } from 'lucide-react';

const statsData = [
  { label: 'Total Requests', value: '156', icon: BookOpen, change: '+12%' },
  { label: 'Published Guides', value: '89', icon: TrendingUp, change: '+8%' },
  { label: 'Active Contributors', value: '24', icon: Users, change: '+3%' },
  { label: 'In Progress', value: '18', icon: Zap, change: '+15%' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { items, filter, searchQuery } = useSelector((state: RootState) => state.content);
  const { data: contentData, isLoading } = useContentQuery();

  useEffect(() => {
    if (contentData) {
      dispatch(setItems(contentData));
    }
    dispatch(setLoading(isLoading));
  }, [contentData, isLoading, dispatch]);

  // Filter content based on current filter and search query
  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Hero skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gradient-subtle rounded-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
        >
          Discover Knowledge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Explore community-driven content requests, contribute your expertise, and learn from comprehensive guides.
        </motion.p>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 4) }}
              whileHover={{ y: -2 }}
              className="bg-content-card p-6 rounded-xl shadow-content hover:shadow-hover transition-all border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Filters */}
      <ContentFilters />

      {/* Content Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <ContentCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : `No ${filter === 'all' ? '' : filter} content available`
              }
            </p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;