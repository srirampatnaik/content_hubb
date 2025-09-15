import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateContentMutation, createContentSchema, CreateContentData } from '@/hooks/useContentQuery';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const categories = [
  'React',
  'Next.js', 
  'TypeScript',
  'JavaScript',
  'Node.js',
  'CSS',
  'Accessibility',
  'Performance',
  'Testing',
  'DevOps',
  'Design',
  'Other',
];

const ContentSubmissionForm = () => {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const createContentMutation = useCreateContentMutation();

  const form = useForm<CreateContentData>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  const onSubmit = async (data: CreateContentData) => {
    try {
      await createContentMutation.mutateAsync(data);
      
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Content request submitted! ✨",
        description: "Your request has been added to the queue and will be reviewed soon.",
      });

      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Submit Content Request
        </h1>
        <p className="text-muted-foreground">
          Have an idea for a guide or tutorial? Submit your request and help the community learn something new.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-content-card shadow-content border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Request Details
            </CardTitle>
            <CardDescription>
              Provide clear details about the content you'd like to see created.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <motion.form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
                animate={isSuccess ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Complete Guide to React Server Components"
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormDescription>
                        A clear, descriptive title for the content you're requesting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the most relevant category for your content request.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what you'd like to learn about, specific topics to cover, target audience, etc."
                          rows={6}
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide details about what you'd like the content to cover. The more specific, the better!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={createContentMutation.isPending}
                    className="w-full bg-gradient-primary hover:shadow-hover h-11"
                  >
                    {createContentMutation.isPending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {createContentMutation.isPending ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContentSubmissionForm;