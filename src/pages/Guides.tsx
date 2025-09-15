import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Guides = () => {
  const { items } = useSelector((state: RootState) => state.content);
  
  // Filter only published guides
  const publishedGuides = items.filter(item => item.status === 'published' && item.slug);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Published Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive tutorials and guides created by our community of experts.
        </p>
      </motion.div>

      {/* Guides Grid */}
      {publishedGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-content-card hover:bg-content-hover hover:shadow-hover transition-all duration-300 border-0 shadow-content group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      ✅ Published
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(guide.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {guide.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {guide.category}
                    </Badge>
                    {guide.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{guide.author || 'Anonymous'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>

                  <Link to={`/guides/${guide.slug}`} className="block">
                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-hover group"
                    >
                      Read Guide
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No published guides yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to contribute and help the community learn!
          </p>
          <Link to="/submit">
            <Button className="bg-gradient-primary hover:shadow-hover">
              Submit a Request
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Guides;