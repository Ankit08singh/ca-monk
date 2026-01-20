import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlogDialog } from '@/components/CreateBlogDialog';

function BlogsPage() {
  const [selectedBlogId, setSelectedBlogId] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CM</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                CA Monk Blog
              </h1>
            </div>
            <CreateBlogDialog />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-88px)]">
        <div className="flex gap-6 h-full">
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <BlogList onSelectBlog={setSelectedBlogId} selectedBlogId={selectedBlogId} />
          </div>

          <div className="hidden lg:block flex-1">
            {selectedBlogId ? (
              <BlogDetail blogId={selectedBlogId} />
            ) : (
              <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl border shadow-sm">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-lg font-medium">Select a blog to read</p>
                  <p className="text-sm text-muted-foreground mt-2">Choose from the list on the left</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
