"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Input,
  Textarea,
  Badge,
  Checkbox
} from "@/components/ui";
import { 
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Flag,
  Search,
  Plus,
  TrendingUp,
  Eye,
  EyeOff,
  Send
} from "lucide-react";

// Mock Data
const MOCK_POSTS = [
  {
    id: 1,
    title: "Just finished reading '1984' - Mind blown!",
    author: "Sarah M.",
    isAnonymous: false,
    content: "The parallels to modern society are incredible. Has anyone else noticed how relevant Orwell's predictions are today?",
    category: "Discussion",
    likes: 24,
    comments: 12,
    timeAgo: "2 hours ago",
    trending: true
  },
  {
    id: 2,
    title: "Looking for recommendations: Books like 'The Alchemist'",
    author: "Anonymous",
    isAnonymous: true,
    content: "I loved the philosophical journey in The Alchemist. Any similar books that explore self-discovery and following your dreams?",
    category: "Recommendations",
    likes: 18,
    comments: 23,
    timeAgo: "5 hours ago",
    trending: false
  },
  {
    id: 3,
    title: "Book Club: Classic Literature Discussion",
    author: "John D.",
    isAnonymous: false,
    content: "Starting a virtual book club focusing on classic literature. First book: Pride and Prejudice. Who's interested?",
    category: "Book Club",
    likes: 42,
    comments: 31,
    timeAgo: "1 day ago",
    trending: true
  },
  {
    id: 4,
    title: "Unpopular opinion: Overrated bestsellers",
    author: "Anonymous",
    isAnonymous: true,
    content: "Am I the only one who finds some bestsellers disappointing? Let's discuss books that didn't live up to the hype.",
    category: "Discussion",
    likes: 67,
    comments: 89,
    timeAgo: "2 days ago",
    trending: true
  }
];

const CATEGORIES = ["All", "Discussion", "Recommendations", "Book Club", "Reviews", "General"];

export default function Forums() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Discussion",
    anonymous: false
  });
  const [expandedPost, setExpandedPost] = useState(null);

  const handleCreatePost = (e) => {
    e.preventDefault();
    // Create post logic here
    setShowCreatePost(false);
    setNewPost({ title: "", content: "", category: "Discussion", anonymous: false });
  };

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="h1" className="mb-2 flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                Book Forums
              </Text>
              <Text variant="body" className="text-zinc-600">
                Join discussions, share recommendations, and connect with fellow readers
              </Text>
            </div>
            <Button variant="primary" onClick={() => setShowCreatePost(!showCreatePost)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Create Post Form */}
        {showCreatePost && (
          <Card className="mb-6 border-2 border-primary">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <Text variant="caption" className="mb-2">Post Title *</Text>
                  <Input
                    placeholder="Enter a descriptive title for your post"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Text variant="caption" className="mb-2">Category *</Text>
                  <select
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Recommendations">Recommendations</option>
                    <option value="Book Club">Book Club</option>
                    <option value="Reviews">Reviews</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <Text variant="caption" className="mb-2">Content *</Text>
                  <Textarea
                    placeholder="Share your thoughts, questions, or recommendations..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg">
                  <Checkbox
                    checked={newPost.anonymous}
                    onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked })}
                  />
                  <div className="flex items-center gap-2">
                    {newPost.anonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <Text variant="body" className="text-sm">
                      Post anonymously
                    </Text>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <Send className="w-4 h-4 mr-2" />
                    Publish Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className={post.trending ? "border-l-4 border-l-orange-500" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                        {post.isAnonymous ? "?" : post.author.charAt(0)}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Text variant="body" className="font-semibold">
                                {post.author}
                              </Text>
                              {post.trending && (
                                <Badge variant="warning" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                            <Text variant="caption" className="text-zinc-600">
                              {post.timeAgo} • {post.category}
                            </Text>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Flag className="w-4 h-4 text-zinc-400" />
                          </Button>
                        </div>

                        <Text variant="h4" className="mb-2">{post.title}</Text>
                        <Text variant="body" className="text-zinc-700 mb-4">
                          {post.content}
                        </Text>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" className="flex items-center gap-2 text-zinc-600 hover:text-primary transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <Text variant="caption">{post.likes}</Text>
                          </Button>
                          <Button 
                            variant="ghost"
                            className="flex items-center gap-2 text-zinc-600 hover:text-primary transition-colors"
                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                          >
                            <MessageCircle className="w-4 h-4" />
                            <Text variant="caption">{post.comments} comments</Text>
                          </Button>
                        </div>

                        {/* Comment Section (Expanded) */}
                        {expandedPost === post.id && (
                          <div className="mt-4 pt-4 border-t border-zinc-200">
                            <Text variant="body" className="text-zinc-600 mb-3">
                              Comments ({post.comments})
                            </Text>
                            
                            {/* Sample Comments */}
                            <div className="space-y-3 mb-4">
                              <div className="bg-zinc-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                                    M
                                  </div>
                                  <Text variant="caption" className="font-semibold">Mike J.</Text>
                                  <Text variant="caption" className="text-zinc-500">• 1 hour ago</Text>
                                </div>
                                <Text variant="body" className="text-sm">
                                  Great post! I completely agree with your perspective.
                                </Text>
                              </div>
                            </div>

                            {/* Add Comment */}
                            <div className="flex gap-2">
                              <Input placeholder="Write a comment..." className="flex-1" />
                              <Button variant="primary" size="sm">
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                  <Text variant="h3" className="mb-2">No posts found</Text>
                  <Text variant="body" className="text-zinc-600 mb-4">
                    Try adjusting your search or create a new post
                  </Text>
                  <Button variant="primary" onClick={() => setShowCreatePost(true)}>
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
