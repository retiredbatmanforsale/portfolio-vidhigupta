/*
  # Fix Blog Security Issues

  ## Changes Made

  1. **Policy Consolidation**
     - Remove redundant SELECT policies for authenticated users
     - Create single comprehensive policy that handles both public and authenticated access

  2. **Function Security**
     - Fix search_path mutability on update_blog_posts_updated_at function
     - Set explicit search_path to prevent security vulnerabilities

  3. **Index Optimization**
     - Keep slug index (used for individual post lookups by URL)
     - Keep tags index (used for tag-based filtering)
     - Both indexes are essential for query performance as blog grows

  ## Security Improvements
  - Eliminates policy redundancy
  - Prevents search_path manipulation attacks
  - Maintains proper access control separation
*/

-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;

-- Create consolidated SELECT policy
-- Public users see only published posts, authenticated users see all posts
CREATE POLICY "View published posts or all if authenticated"
  ON blog_posts FOR SELECT
  USING (
    is_published = true 
    OR 
    (auth.role() = 'authenticated')
  );

-- Drop trigger first, then function
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
DROP FUNCTION IF EXISTS update_blog_posts_updated_at();

-- Recreate function with proper security settings
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Add comments to explain index purposes (for future reference)
COMMENT ON INDEX idx_blog_posts_slug IS 'Used for individual blog post lookups by URL slug';
COMMENT ON INDEX idx_blog_posts_tags IS 'Used for tag-based filtering and search queries';
