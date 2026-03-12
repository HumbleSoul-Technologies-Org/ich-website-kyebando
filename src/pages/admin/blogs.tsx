import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Image as ImageIcon,
  Loader,
  Eye,
  CheckCircle,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

import { apiRequest } from "@/lib/queryClient";
import { set } from "date-fns";

export default function AdminBlogsPage() {
    const { data: blogsData, isLoading: blogsLoading } = useQuery<any>({
      queryKey: ["blogs", "all"],
    });

  const { toast } = useToast();
  const [blogs, setBlogs] = useState<any[]>(blogsData || []);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published"
  >("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    author: "",
    excerpt: "",
    content: "",
    thumbnail: { url: "", public_id: "" },
    status: "draft",
    videoId: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedBlogForComments, setSelectedBlogForComments] = useState<
    any | null
  >(null);
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  // const [blogsLoading, setblogsLoading] = useState<boolean | null>(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (!openMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside of any menu
      const menuElements = document.querySelectorAll("[data-menu-container]");
      const clickedInMenu = Array.from(menuElements).some((el) =>
        el.contains(e.target as Node),
      );

      if (!clickedInMenu) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenu]);

  useEffect(() => { 
    if (blogsData) {
     setBlogs(blogsData);
    }
  }, [blogsData]);

  // Helper to get unique blog identifier (handles both _id and id from mock data)
  const getBlogId = (blog: any): string =>
    blog._id || blog.id || `blog-${Math.random()}`;

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSelectedImage(file);
      setSelectedImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleImageUpload(f);
  };

  const uploadFileToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    } catch (error) {
      console.error(error);
      return { url: "", public_id: "" };
    }
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      if (key === "featuredImage") {
        return {
          ...prev,
          featuredImage: { ...prev.featuredImage, url: value },
        };
      }
      return { ...prev, [key]: value };
    });
  };

  const openCreateForm = () => {
    setSelectedBlog(null); // make sure we are not editing an existing post
    setFormData({
      title: "",
      author: "",
      excerpt: "",
      content: "",
      thumbnail: { url: "", public_id: "" },
      status: "draft",
      videoId: "",
      _id: undefined,
    });
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setFormOpen(true);
  };

  const editBlog = (blog: any) => {
    setSelectedBlog(blog);
    setFormData({
      ...blog,
      publishDate: blog.publishDate
        ? new Date(blog.publishDate).toISOString().split("T")[0]
        : "",
    });
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setFormOpen(true);
    setOpenMenu(null);
  };

  const viewDetails = (blog: any) => {
    setSelectedBlog(blog);
    setDialogOpen(true);
    setOpenMenu(null);
  };

  const openComments = (blog: any) => {
    setSelectedBlogForComments(blog);
    setCommentsOpen(true);
    setOpenMenu(null);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = {
        url: formData.thumbnail?.url || "",
        public_id: formData.thumbnail?.public_id || "",
      };

      if (selectedImage) {
        imageUrl = await uploadFileToServer(selectedImage as File);
      }

      const payload = {
        ...formData,
        thumbnail: {
          url: imageUrl.url || formData.thumbnail?.url,
          public_id: imageUrl.public_id || "",
        },
        publishDate: formData.publishDate
          ? new Date(formData.publishDate).toISOString()
          : null,
      };

      if (formData._id) {
        // update
        const response = await apiRequest("PUT", `/blogs/update/${formData._id}`, payload);
        setBlogs((prev) =>
          prev.map((b) =>
            getBlogId(b) === formData._id ? { ...b, ...response, ...payload } : b,
          ),
        );
        // if we were viewing details, refresh that too
        setSelectedBlog((prev: any) =>
          prev ? { ...prev, ...response, ...payload } : prev,
        );
        toast({
          title: "Blog updated",
          description: "Blog post has been updated successfully",
        });
      } else {
        // create
        const response = await apiRequest("POST", "/blogs/create", payload);
        setBlogs((prev) => [response, ...prev]);
        toast({
          title: "Blog created",
          description: "New blog post has been created successfully",
        });
      }

      setFormOpen(false);
      setOpenMenu(null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to save blog",
        description: "Could not save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (blog: any) => {
     const blogId = getBlogId(blog);
      setDeleting(blogId);
      try {
        await apiRequest("DELETE", `/blogs/delete/${blogId}`);
        setBlogs((prev) => prev.filter((b) => getBlogId(b) !== blogId));
        if (selectedBlog && getBlogId(selectedBlog) === blogId) {
          setSelectedBlog(null);
          setDialogOpen(false);
        }
        toast({
          title: "Blog deleted",
          description: "Blog post has been deleted successfully",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to delete blog",
          description: "Could not delete blog post",
          variant: "destructive",
        });
      } finally {
        setDeleting(null);
      }
    setOpenMenu(null);
  };

  const publishBlog = async (blog: any) => {
    const blogId = getBlogId(blog);
    setPublishing(blogId);
    try {
      const publishDate = new Date().toISOString();
      const updatedBlog = { ...blog, status: "published", publishDate };
      await apiRequest("PUT", `/blogs/publish/blog/${blogId}`, updatedBlog);
      setBlogs((prev) =>
        prev.map((b) => (getBlogId(b) === blogId ? updatedBlog : b)),
      );
      toast({
        title: "Blog published",
        description: "Blog post has been published successfully",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setPublishing(null);
      setOpenMenu(null);
    }
  };

  const deleteComment = async (commentId: string) => {
    setDeletingComment(commentId);
    try {
      const blogId = getBlogId(selectedBlogForComments);
      await apiRequest("DELETE", `/blogs/${blogId}/comments/${commentId}`);
      
      // Update the selected blog for comments
      setSelectedBlogForComments((prev: any) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.filter((c: any) => c._id !== commentId),
            }
          : prev,
      );
      
      // Update the blogs list
      setBlogs((prev) =>
        prev.map((b) =>
          getBlogId(b) === blogId
            ? {
                ...b,
                comments: b.comments.filter((c: any) => c._id !== commentId),
              }
            : b,
        ),
      );
      
      toast({
        title: "Comment deleted",
        description: "Comment has been deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete comment",
        description: "Could not delete comment",
        variant: "destructive",
      });
    } finally {
      setDeletingComment(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (statusFilter !== "all" && blog.status !== statusFilter) {
      return false;
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchTitle = blog.title.toLowerCase().includes(search);
      const matchAuthor = blog.author.toLowerCase().includes(search);
      const matchTags = blog.tags?.some((t: string) =>
        t.toLowerCase().includes(search),
      );

      return matchTitle || matchAuthor || matchTags;
    }

    return true;
  });

  if (blogsLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Blog Posts</h1>
              <p className="text-muted-foreground mt-1">
                Manage and publish blog content
              </p>
            </div>
            <div>
              <Button onClick={openCreateForm} size="sm">
                New Post
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center md:justify-between gap-2 flex-wrap">
              {/* Search Input */}
              <div className="relative flex items-center w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All ({blogs.length})
                </Button>
                <Button
                  variant={statusFilter === "draft" ? "default" : "outline"}
                  onClick={() => setStatusFilter("draft")}
                  size="sm"
                >
                  Draft ({blogs.filter((b) => b.status === "draft").length})
                </Button>
                <Button
                  variant={statusFilter === "published" ? "default" : "outline"}
                  onClick={() => setStatusFilter("published")}
                  size="sm"
                >
                  Published (
                  {blogs.filter((b) => b.status === "published").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredBlogs.length} Result
              {filteredBlogs.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {filteredBlogs.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <img
                  src="/no-blogs.avif"
                  alt="No blog posts found"
                  className="mx-auto h-96 w-96 object-contain text-muted-foreground"
                />
                <p className="text-center text-muted-foreground py-8">
                  No blog posts found matching your criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, idx) => {
                const menuId = getBlogId(blog);
                return (
                  <div
                    key={menuId}
                    data-menu-container="true"
                    className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96 group bg-white"
                  >
                    {/* Featured Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={blog?.thumbnail?.url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                      {/* Top Section */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl text-primary font-bold mb-1 line-clamp-2">
                            {blog?.title}
                          </h3>
                          <p className="text-sm text-white/80">{blog?.author}</p>
                        </div>
                        <Badge
                          variant={
                            blog.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {blog?.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </div>

                      {/* Bottom Section */}
                      <div className="space-y-4">
                        <p className="text-sm text-white/90 line-clamp-2">
                          {blog?.excerpt}
                        </p>

                        <div className="pt-2 border-t border-white/20">
                          <p className="text-xs text-white/70">
                            {blog?.publishedOn
                              ? <span>Published on: {new Date(blog.publishedOn).toLocaleDateString()}</span>
                              : "Not published"}
                          </p>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-2">
                              {blog.tags
                                .slice(0, 2)
                                .map((tag: string, idx: number) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              {blog.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{blog.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Stats Section */}
                          <div className="flex items-center gap-4 mt-3 pt-2 border-t border-white/20">
                            <div className="flex items-center gap-1 text-white/80">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">{blog?.likes?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/80">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs">
                                {blog?.comments?.length || 0}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-white/80">
                              <Eye className="w-4 h-4" />
                              <span className="text-xs">{blog?.views?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/80">
                              <Share2 className="w-4 h-4" />
                              <span className="text-xs">
                                {blog?.shares?.length || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-4 right-4 z-20 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setOpenMenu(openMenu === menuId ? null : menuId);
                          }}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
                          aria-label="Actions"
                        >
                          <MoreVertical className="w-5 h-5 text-white" />
                        </button>

                        {openMenu === menuId && (
                          <div
                            className="absolute bottom-10 right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                viewDetails(blog);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" /> View Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                editBlog(blog);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            {blog.status !== "published" && (
                              <button
                              onClick={(e) => {
                                e.stopPropagation();
                                publishBlog(blog);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:text-green-600 hover:bg-gray-100"
                            >
                              {publishing === getBlogId(blog) ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              Publish
                            </button>)}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openComments(blog);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            >
                              <MessageCircle className="w-4 h-4" /> Comments (
                              {blog?.comments ? blog?.comments.length : 0})
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteBlog(blog);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              {deleting === getBlogId(blog) ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Blog Details Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open: boolean) => {
          if (!open) setSelectedBlog(null);
          setDialogOpen(open);
        }}
      >
        {selectedBlog && (
          <DialogContent className="max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedBlog.title}</DialogTitle>
              <DialogDescription>
                {selectedBlog.author} •{" "}
                {selectedBlog.publishedOn
                  ? new Date(selectedBlog.publishedOn).toLocaleDateString(
                      "en-US",
                    )
                  : "Not published"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <img
                src={
                  typeof selectedBlog.thumbnail === "string"
                    ? selectedBlog.thumbnail
                    : selectedBlog.thumbnail?.url
                }
                alt={selectedBlog.title}
                className="w-full h-48 object-cover rounded-md"
              />

              <div>
                <h4 className="font-semibold mb-1">Excerpt</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedBlog.excerpt}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Content</h4>
                <p className="text-sm text-justify text-muted-foreground whitespace-pre-wrap line-clamp-6">
                  {selectedBlog.content}
                </p>
              </div>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedBlog.tags.map((tag: string, idx: number) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlog.videoId && (
                <div>
                  <h4 className="font-semibold mb-2">Video</h4>
                  <div className="w-full aspect-video rounded-md overflow-hidden bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedBlog.videoId}`}
                      title="Blog Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    editBlog(selectedBlog);
                    setDialogOpen(false);
                  }}
                >
                  Edit
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Create/Edit Blog Form Dialog */}
      <Dialog open={formOpen} onOpenChange={(open) => setFormOpen(open)}>
        <DialogContent className="max-h-[800px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formData._id ? "Edit Post" : "Create New Post"}
            </DialogTitle>
            <DialogDescription>
              {formData.title || "Add a new blog post"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="grid gap-4">
            <Input
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              required
            />
            <Input
              placeholder="Author"
              value={formData.author}
              onChange={(e) => handleFormChange("author", e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Input
                placeholder="Featured Image URL or upload"
                value={formData.thumbnail?.url}
                onChange={(e) =>
                  handleFormChange("featuredImage", e.target.value)
                }
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileInputChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </Button>
            </div>

            {/* Preview for uploaded image */}
            {(selectedImagePreview || formData.thumbnail?.url) && (
              <div className="pt-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Thumbnail Preview
                </p>
                <img
                  src={selectedImagePreview || formData.featuredImage?.url}
                  alt="featured-preview"
                  className="w-48 h-32 object-cover rounded-md"
                />
              </div>
            )}

            <Textarea
              placeholder="Excerpt / Summary"
              value={formData.excerpt}
              onChange={(e) => handleFormChange("excerpt", e.target.value)}
            />

            <Textarea
              className="min-h-[300px] max-h-[300px]"
              placeholder="Full content"
              value={formData.content}
              onChange={(e) => handleFormChange("content", e.target.value)}
            />

            <div>
              <Input
                placeholder="YouTube Video ID"
                value={formData.videoId || ""}
                onChange={(e) => handleFormChange("videoId", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter just the video ID (e.g., dQw4w9WgXcQ from
                youtube.com/watch?v=dQw4w9WgXcQ)
              </p>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleFormChange("status", e.target.value)}
                className="w-full rounded-md border p-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                <Button type="submit">
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      Saving... <Loader className="w-4 h-4 animate-spin" />
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button variant="outline" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog
        open={commentsOpen}
        onOpenChange={(open) => setCommentsOpen(open)}
      >
        <DialogContent className="max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              {selectedBlogForComments ? selectedBlogForComments?.title : ""}
            </DialogDescription>
          </DialogHeader>

          {/* comments list */}
          {selectedBlogForComments?.comments &&
            selectedBlogForComments?.comments.length > 0 ? (
            <div className="space-y-4">
              {selectedBlogForComments?.comments.map((comment: any) => (
                <div
                  key={comment._id || Math.random()}
                  className="p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <img
                        src={comment.user?.avatar || "/user.avif"}
                        alt={comment.user?.name || comment.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {comment.user?.name || comment.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "Just now"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      disabled={deletingComment === comment._id}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded flex-shrink-0"
                      aria-label="Delete comment"
                    >
                      {deletingComment === comment._id ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                    {comment.text || comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-muted-foreground">No comments yet</p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCommentsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
