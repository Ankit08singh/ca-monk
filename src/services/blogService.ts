export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface CreateBlogData {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}

const API_BASE_URL = 'http://localhost:3001';

export const blogService = {
  // Get all blogs
  getBlogs: async (): Promise<Blog[]> => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return response.json();
  },

  // Create new blog
  createBlog: async (data: CreateBlogData): Promise<Blog> => {
    const newBlog = {
      ...data,
      date: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    });

    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    return response.json();
  },
};
