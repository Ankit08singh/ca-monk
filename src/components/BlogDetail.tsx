import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Clock } from 'lucide-react';

interface BlogDetailProps {
  blogId: string;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading blog...</p>
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
          <p className="text-destructive font-semibold">Error loading blog</p>
          <p className="text-sm text-muted-foreground mt-2">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  const readTime = Math.ceil(blog.content.split(' ').length / 200);

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
      <article className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.category.map((cat) => (
              <Badge key={cat} className="px-3 py-1">
                {cat}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {blog.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          </section>

          <div className="h-px bg-border"></div>

          <section className="prose prose-slate dark:prose-invert max-w-none">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-4 text-base">
                {paragraph}
              </p>
            ))}
          </section>
        </div>
      </article>
    </div>
  );
}
