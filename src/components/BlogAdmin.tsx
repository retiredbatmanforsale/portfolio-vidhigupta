import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { BlogPost } from '../lib/database.types';

export default function BlogAdmin() {
  const { signOut } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author_name: 'Vidhi Gupta',
      cover_image_url: '',
      tags: [],
      is_published: false,
      read_time_minutes: 5,
    });
    setEditing(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!currentBlog?.title || !currentBlog?.slug || !currentBlog?.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (currentBlog.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(currentBlog)
          .eq('id', currentBlog.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([currentBlog]);

        if (error) throw error;
      }

      setEditing(false);
      setCurrentBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog post');
    }
  };

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          is_published: !blog.is_published,
          published_at: !blog.is_published ? new Date().toISOString() : blog.published_at,
        })
        .eq('id', blog.id);

      if (error) throw error;
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (editing && currentBlog) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                {currentBlog.id ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                onClick={() => {
                  setEditing(false);
                  setCurrentBlog(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={currentBlog.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    setCurrentBlog({
                      ...currentBlog,
                      title,
                      slug: currentBlog.id ? currentBlog.slug : generateSlug(title),
                    });
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={currentBlog.slug || ''}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={currentBlog.excerpt || ''}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Short summary of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={currentBlog.content || ''}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, content: e.target.value })
                  }
                  rows={15}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={currentBlog.cover_image_url || ''}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, cover_image_url: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={currentBlog.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="AI, Leadership, Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={currentBlog.read_time_minutes || 5}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        read_time_minutes: parseInt(e.target.value) || 5,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={currentBlog.is_published || false}
                  onChange={(e) =>
                    setCurrentBlog({
                      ...currentBlog,
                      is_published: e.target.checked,
                      published_at: e.target.checked ? new Date().toISOString() : null,
                    })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="is_published" className="text-sm font-semibold text-slate-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Save size={20} />
                  Save Blog Post
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setCurrentBlog(null);
                  }}
                  className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Blog Management</h1>
          <div className="flex gap-4">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              New Blog Post
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              No blog posts yet
            </h3>
            <p className="text-slate-600 mb-6">
              Create your first blog post to get started
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              Create Blog Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {blog.title}
                      </h3>
                      {blog.is_published ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mb-3">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePublish(blog)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title={blog.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {blog.is_published ? (
                        <EyeOff size={20} className="text-slate-600" />
                      ) : (
                        <Eye size={20} className="text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={20} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
