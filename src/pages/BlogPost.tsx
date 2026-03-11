import { motion } from "framer-motion";
import { useRoute, Link } from "wouter";
import { useState,useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { blogsData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';
import { set } from "date-fns";
import { ThumbsUp, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";


export default function BlogPost() {
  const [match, params] = useRoute('/blog/:id');
  const id = params?.id;
  // const post = blogsData.find((p) => p.id === id);
  const [post, setPost] = useState<any>(null);

  const initialComments = Array.isArray(post?.comments) ? post?.comments : [];
  const [comments, setComments] = useState<any[]>(initialComments || []);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(true);

  const { data: postdata, isLoading: loading } = useQuery<any>({
      queryKey: ["blogs",`${params?.id}`],
  })
  
   useEffect(() => {
      if (postdata) {
        setPost(postdata);
      }
    }, [postdata]);
  

 async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    setCommenting(true);
    try {
      if (!commentText.trim()) return;
      const newComment = {
        name: name.trim() || "Anonymous",
        comment: commentText.trim(),
         
      };

      const payload = {
        ...newComment,
        uuid: uuidv4(),
        type: "blog",
        typeId: post._id,
      };

      await apiRequest('POST', '/comments/new', payload);
      console.log('====================================');
      console.log(payload);
      console.log('====================================');
      setComments((s) => [newComment, ...s]);
      setName("");
      setCommentText("");
    } catch (error) {
      console.log('====================================');
      console.log();
      console.log('====================================');
    } finally {
      setCommenting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {!post ? (
            <div className="max-w-3xl mx-auto text-center py-24">
              <h2 className="text-3xl font-bold mb-4">Post not found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find the blog post you're looking for.</p>
              <Link href="/blog"><a className="text-primary font-semibold">Back to News</a></Link>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Content column (mobile-first) */}
                <article className="lg:col-span-8 order-1 lg:order-2">
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post?.title}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground mb-6">
                      <div className="flex   items-center w-1/4   font-medium">
                        <p className="flex text-gray-400 mr-2 text-xs items-center justify-center"><User className="w-4 h-4  " /> Author:</p>
                        <p>{post?.author}</p>
                      </div>
                      <time className="text-xs" dateTime={post?.createdAt}>
                        {new Date(post?.createdAt).toLocaleString()}
                      </time>
                    </div>

                  <Card className="mb-8 bg-white/80 border-0 shadow-xl text-muted">
                    <div className="h-64 md:h-96 overflow-hidden rounded-lg">
                      <img src={post?.thumbnail.url} alt={post?.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent>
                      <p className="leading-relaxed text-justify text-base md:text-lg text-foreground">{post?.content}</p>
                    </CardContent>
                  </Card>

                  
                    

                  <div className="mt-6">
                    <Link href="/blog"><a className="inline-flex items-center text-primary font-semibold">← Back to News</a></Link>
                  </div>
                </article>

                {/* Comments column (left on desktop) */}
                <aside className="lg:col-span-4 order-2 lg:order-1">
                  <div className="sticky top-28 bg-white/80 p-5 rounded-xl border border-border/50 shadow-sm">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Comments</h3>
                      <div className="text-sm text-muted-foreground">{comments.length} comment{comments.length !== 1 ? 's' : ''}</div>
                    </div>

                    <form onSubmit={handleAddComment} className="mb-4 grid grid-cols-1 gap-3">
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 rounded-md border border-border/50 bg-background" />
                      <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full px-3 py-2 rounded-md border border-border/50 bg-background h-28 resize-none" />
                      <div className="flex justify-end">
                        <Button type="submit">Post Comment</Button>
                      </div>
                    </form>

                    <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
                      {comments.length === 0 && (
                        <div className="text-sm text-muted-foreground">No comments yet — be the first to comment.</div>
                      )}
                      {comments.map((c, i) => (
                        <div key={i} className="flex relative items-start gap-3 border-b-2 border-border/50 pb-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {String(c.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">{c.name}</div>
                            <div className="text-xs text-muted-foreground mb-1">{new Date(c.date).toLocaleString()}</div>
                            <div className="text-sm text-foreground">{c.comment}</div>
                          </div>
                          <span className="absolute flex gap-2 items-center justify-center top-0 right-0 text-xs text-muted-foreground">Likes: {c?.likes?.length || 0}</span>
                          <ThumbsUp className="w-4 absolute bottom-1 right-1 h-4"/>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
