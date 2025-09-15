import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentItem } from '@/store/slices/contentSlice';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

const statusColors = {
  requested: 'bg-accent text-accent-foreground',
  'in-progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusIcons = {
  requested: '💭',
  'in-progress': '⚡',
  published: '✅',
};

const ContentCard = ({ item, index }: ContentCardProps) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="h-full bg-content-card hover:bg-content-hover hover:shadow-hover transition-all duration-300 border-0 shadow-content">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge className={`${statusColors[item.status]} text-xs font-medium`}>
              {statusIcons[item.status]} {item.status.replace('-', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {item.category}
            </Badge>
            {item.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {item.author && (
            <div className="flex items-center text-xs text-muted-foreground">
              <User className="h-3 w-3 mr-1" />
              <span>by {item.author}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>5 min read</span>
            </div>
            
            {item.status === 'published' && item.slug ? (
              <Link to={`/guides/${item.slug}`}>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                >
                  Read Guide
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="capitalize">{item.status}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ContentCard;