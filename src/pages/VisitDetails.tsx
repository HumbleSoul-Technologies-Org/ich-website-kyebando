import React, { useState, useRef, useEffect } from "react";
import { useRoute, Link } from "wouter";
import NotFound from "@/pages/not-found";
import { mockCommunities } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsDown, ThumbsUp, User, ChevronDown, Eye, Loader2 } from "lucide-react";

export default function VisitDetails() {
  const [match, params] = useRoute("/visits/:id");
  if (!match) return <NotFound />;

  const id = Number((params as any).id);
  const visit = mockCommunities.find((v) => Number(v.id) === id);

  if (!visit) return <NotFound />;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>(visit.comments || []);
  const [commentForm, setCommentForm] = useState({ name: "", phone: "", comment: "" });
  const [canScroll, setCanScroll] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const commentsActive = visit.status === "visited";

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

    useEffect(() => {
      
        window.scrollTo(0,0);
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollContainerRef.current;
        setCanScroll(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 10);
      }
    };

    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setCommentForm((p) => ({ ...p, [name]: value }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.comment || !commentForm.name) {
      alert("Please enter your name and comment");
      return;
    }
    const newComment = {
      name: commentForm.name,
      phone: commentForm.phone,
      comment: commentForm.comment,
      date: new Date().toISOString(),
    };
    setComments((c) => [newComment, ...c]);
    setCommentForm({ name: "", comment: "",phone:"" });
  };
  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <Link href="/communities" className="text-xs sm:text-sm text-muted-foreground underline truncate">
          ← Back
        </Link>
        <div className="text-xs sm:text-sm text-muted-foreground truncate">{visit.date}</div>
      </div>

      <div className="bg-white mb-6 rounded-lg h-screen sm:h-[500px] md:h-[700px] overflow-hidden shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Thumbnail */}
          <div className="flex md:items-stretch md:col-span-1 max-h-[250px] sm:max-h-[350px] md:max-h-none">
            <div
              className="w-full bg-cover bg-center h-full md:min-h-[420px]"
              style={{ backgroundImage: `url(${visit.thumbnail})` }}
            />
          </div>

          {/* Right: Details */}
          <div ref={scrollContainerRef} className="p-3 sm:p-4 md:p-6 overflow-y-auto md:col-span-1 max-h-screen sm:h-screen md:max-h-[700px] relative">
            <h1 className="text-xl sm:text-2xl font-bold">{visit.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {visit.community} — {visit.country}
            </p>

            <p className="mt-2 sm:mt-4 text-sm text-muted-foreground">{visit.excerpt}</p>

            {/* Video (YouTube) */}
            {visit.videoId && (
              <div className="mt-3 sm:mt-4 md:mt-6">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  {!videoLoaded && (
                    <div className="absolute inset-0 w-full h-full rounded flex items-center justify-center">
                      <Skeleton className="absolute inset-0 w-full h-full rounded" />
                      <div className="absolute flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-sm font-medium text-foreground">Loading video...</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={`https://www.youtube.com/embed/${visit.videoId}`}
                    title={visit.title}
                    className={`absolute inset-0 w-full h-full rounded transition-opacity duration-300 ${
                      videoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setVideoLoaded(true)}
                  />
                </div>
              </div>
            )}

            <div className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base text-justify">
              <p>{visit.content}</p>
            </div>

            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6">
              <div className="">
                <h3 className="font-semibold text-sm sm:text-base">Participants</h3>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
                  {visit.participants && visit.participants.length > 0 ? (
                    visit.participants.slice(0, 3).map((p: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{p.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">{p.role}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground">No participants listed.</div>
                  )}
                </div>
              </div>

              <div className="">
                <h3 className="font-semibold text-sm sm:text-base">Gallery</h3>
                {visit.gallery && visit.gallery.length > 0 ? (
                  <div className="mt-2 sm:mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 transition-all">
                    {visit.gallery.map((img: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveImage(img);
                          setIsGalleryOpen(true);
                        }}
                        className="overflow-hidden rounded"
                      >
                        <img
                          src={img}
                          alt={`gallery-${i}`}
                          className="w-full h-16 sm:h-20 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-muted rounded text-xs sm:text-sm text-muted-foreground">
                    Images will be available after the event.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col gap-2">
              <div className="flex gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" /><span>Likes: {visit.likes}</span></div>
                <div className="flex items-center gap-1"><Eye className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" /><span>Views: {visit.views}</span></div>
              </div>
            </div>

            {/* Scroll Indicator */}
            {canScroll && (
              <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black via-black/50 to-transparent hidden md:flex flex-col items-center justify-end pb-2 sm:pb-4 gap-1 animate-pulse">
                <span className="text-xs text-white font-medium">Scroll for more</span>
                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-white animate-bounce" />
              </div>
            )}
          </div>
        </div>
          </div>
          
           <Link href="/communities" className="text-xs mt-6 sm:text-sm text-muted-foreground underline truncate">
          ← Back to communities
        </Link>
      {/* Comments Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3 px-3 sm:px-0">Comments</h2>
        {!commentsActive ? (
          <div className="p-3 sm:p-4 mx-3 sm:mx-0 bg-muted rounded-md text-xs sm:text-sm text-muted-foreground">
            Comments will activate on the day of the event ({new Date(visit.date).toLocaleDateString()}).
          </div>
        ) : (
          <div className="space-y-4 mx-3 sm:mx-0">
            <form onSubmit={handleCommentSubmit} className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                <input
                  name="name"
                  value={commentForm.name}
                  onChange={handleCommentChange}
                  placeholder="Your name"
                  className="col-span-1 px-2 py-2 sm:p-2 border rounded text-sm"
                />
                <input
                  name="phone"
                  value={commentForm.phone}
                  onChange={handleCommentChange}
                  placeholder="Phone (optional)"
                  className="col-span-1 px-2 py-2 sm:p-2 border rounded text-sm"
                />
                <div />
              </div>

              <textarea
                name="comment"
                value={commentForm.comment}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
                className="w-full px-2 py-2 sm:p-2 border rounded h-24 sm:h-28 text-sm"
              />

              <div>
                <button type="submit" className="px-3 sm:px-4 py-2 bg-primary text-white rounded text-sm font-medium">
                  Post Comment
                </button>
              </div>
            </form>

            <div className="space-y-3 sm:space-y-4">
              {comments.length === 0 ? (
                <div className="text-xs sm:text-sm text-muted-foreground">No comments yet.</div>
              ) : (
                comments.map((c, idx) => (
                  <div key={idx} className="p-3 sm:p-4 border rounded relative">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium flex items-center gap-2 min-w-0 flex-1"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s" className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0"/><span className="text-sm truncate">{c.name}</span></div>
                      <div className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{getRelativeTime(c.date)}</div>
                    </div>
                    {c.phone && <div className="text-xs sm:text-sm text-muted-foreground mt-1">{c.phone}</div>}
                        <p className="mt-2 text-sm">{c.comment}</p>
                        
                        <span className="absolute gap-2 sm:gap-4 flex items-center justify-center bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs">
                            <span className="flex items-center justify-center gap-1 text-muted-foreground"><ThumbsUp className="w-3 sm:w-4 h-3 sm:h-4"/>678</span><span className="flex items-center justify-center gap-1 text-muted-foreground"><ThumbsDown className="w-3 sm:w-4 h-3 sm:h-4" /> 24</span></span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {/* Gallery Lightbox Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="w-full max-w-2xl sm:max-w-4xl p-3 sm:p-6">
          <DialogHeader>
            <DialogTitle>Image preview</DialogTitle>
          </DialogHeader>
          <div className="py-2 sm:py-4">
            {activeImage && (
              <img
                src={activeImage}
                alt="preview"
                className="w-full h-auto max-h-[60vh] sm:max-h-[80vh] object-contain rounded"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
