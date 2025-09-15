import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuideDetail = () => {
  const { slug } = useParams();
  const { items } = useSelector((state: RootState) => state.content);
  
  const guide = items.find(item => item.slug === slug && item.status === 'published');

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const mockContent = `
# ${guide.title}

Welcome to this comprehensive guide! This tutorial will walk you through everything you need to know about ${guide.category}.

## Introduction

${guide.description}

## Table of Contents

1. [Getting Started](#getting-started)
2. [Core Concepts](#core-concepts)
3. [Advanced Techniques](#advanced-techniques)
4. [Best Practices](#best-practices)
5. [Conclusion](#conclusion)

## Getting Started

To begin, you'll need to understand the fundamentals of ${guide.category}. This technology has become essential in modern web development.

### Prerequisites

- Basic understanding of JavaScript
- Familiarity with modern web development
- A code editor of your choice

## Core Concepts

Let's dive into the core concepts that make ${guide.category} so powerful:

### Key Features

1. **Performance**: Optimized for speed and efficiency
2. **Developer Experience**: Great tooling and documentation
3. **Community**: Strong ecosystem and community support

\`\`\`javascript
// Example code snippet
function example() {
  console.log('This is an example!');
}
\`\`\`

## Advanced Techniques

Once you've mastered the basics, you can explore these advanced patterns:

- Pattern 1: Advanced state management
- Pattern 2: Performance optimization
- Pattern 3: Testing strategies

## Best Practices

Here are some best practices to keep in mind:

> **Tip**: Always consider performance implications when implementing new features.

1. Keep your code clean and readable
2. Follow established conventions
3. Test your implementations thoroughly
4. Document your code properly

## Conclusion

${guide.category} is a powerful technology that can significantly improve your development workflow. With the concepts covered in this guide, you're well on your way to mastering it.

Happy coding! 🚀
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/guides">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Button>
        </Link>

        <div className="space-y-4">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            ✅ Published Guide
          </Badge>
          
          <h1 className="text-4xl font-bold leading-tight">{guide.title}</h1>
          
          <p className="text-xl text-muted-foreground">{guide.description}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{guide.author || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(guide.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>5 min read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{guide.category}</Badge>
            {guide.tags?.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" variant="outline">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
          </div>
        </div>
      </motion.div>

      <Separator className="mb-8" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-content-card shadow-content border-0">
          <CardContent className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div style={{ whiteSpace: 'pre-line' }} className="space-y-6">
                {mockContent.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('> ')) {
                    return <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{line.slice(2)}</blockquote>;
                  }
                  if (line.startsWith('```')) {
                    return <div key={index} className="bg-muted p-4 rounded-lg my-4 font-mono text-sm">{line}</div>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Card className="bg-content-card shadow-content border-0 p-6">
          <h3 className="text-lg font-semibold mb-2">Was this guide helpful?</h3>
          <p className="text-muted-foreground mb-4">Help us improve by providing feedback</p>
          <div className="flex justify-center gap-2">
            <Button size="sm" className="bg-gradient-primary hover:shadow-hover">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Yes, helpful!
            </Button>
            <Button size="sm" variant="outline">
              Suggest improvements
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default GuideDetail;