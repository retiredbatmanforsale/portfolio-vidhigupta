import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, Tag, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/database.types';

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  ).sort();

  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => blog.tags.includes(selectedTag))
    : blogs;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section id="blogs" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto mb-6"></div>
            <div className="h-1 bg-slate-200 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Blog & Insights
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>

        <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
          Sharing thoughts on technology leadership, program management, AI innovation, and
          engineering excellence.
        </p>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-slate-600">
              Check back soon for insights on technology leadership and innovation.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-slate-200 group"
              >
                {blog.cover_image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(blog.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{blog.read_time_minutes} min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>

                  {blog.excerpt && (
                    <p className="text-slate-700 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-white text-slate-600 rounded-full text-sm"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <a
                    href={`#blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read More
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
