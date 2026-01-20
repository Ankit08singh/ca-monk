import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import type { Blog } from '@/services/blogService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar } from 'lucide-react';

interface BlogListProps {
  onSelectBlog: (blogId: string) => void;
  selectedBlogId?: string;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-destructive font-semibold">Error loading blogs</p>
          <p className="text-sm text-muted-foreground mt-2">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold">All Blogs</h2>
        <p className="text-sm text-muted-foreground mt-1">{blogs?.length || 0} articles</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {blogs?.map((blog: Blog) => (
          <Card
            key={blog.id}
            className={`cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] ${
              selectedBlogId === blog.id 
                ? 'ring-2 ring-primary shadow-md' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectBlog(blog.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {blog.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs px-2 py-0.5">
                    {cat}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-base leading-snug">{blog.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs">
                <Calendar className="h-3 w-3" />
                {new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {blog.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
