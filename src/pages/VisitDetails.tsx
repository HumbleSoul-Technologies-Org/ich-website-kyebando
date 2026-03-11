import React, { useState, useRef, useEffect } from "react";
import { useRoute, Link } from "wouter";
import NotFound from "@/pages/not-found";
import { mockCommunities } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ThumbsDown, ThumbsUp, User, ChevronDown, Eye, Loader2, Loader, Share2 } from "lucide-react";
import { set } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export default function VisitDetails() {
  
const [match, params] = useRoute("/visits/:id");
  if (!match) return <NotFound />;
 const { data: visitsData, isLoading: visitsLoading } = useQuery<any>({
    queryKey: ["visits",`${params.id}`],
  })

  const { toast } = useToast();
  const userIdRef = useRef(uuidv4());

  const [visit, setVisit] = useState<any>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [canScroll, setCanScroll] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [UUID, setUUID] = useState<any|string>("");


  const commentsActive = visit?.status === "visited";

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
    }, []);

    useEffect(() => {
      const checkScroll = () => {
        if (scrollContainerRef.current) {
          const { scrollHeight, clientHeight, scrollTop } = scrollContainerRef.current;
          setCanScroll(scrollHeight > clientHeight && scrollTop < 10);
        }
      };

      // Check on mount and with a small delay to ensure DOM is rendered
      setTimeout(() => {
        checkScroll();
      }, 100);

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
    }, [visit]);
  
  useEffect(() => {
    if (visitsData) {
      const foundVisit = Array.isArray(visitsData) ? visitsData[0] : visitsData;
      setVisit(foundVisit);
      create_UUID();
    }
  }, [visitsData]);

  useEffect(() => {
    if (visit) {
      setComments(visit?.comments || []);
    }
  }, [visit]);

  const create_UUID = async() => {
       const savedUUID = localStorage.getItem("visitor_uuid");
      if (savedUUID) {
        setUUID(savedUUID);
      } else {
        const newUUID = uuidv4();
        localStorage.setItem("visitor_uuid", newUUID);
        setUUID(newUUID);
      }
    }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommenting(true);
    try {
      if (!commentText.trim()) {
        setCommenting(false);
        return;
      }

      const newComment = {
        name: name.trim() || "Anonymous",
        comment: commentText.trim(),
      };

      const payload = {
        ...newComment,
        uuid: UUID,
        type: "visit",
        typeId: visit._id,
      };

      await apiRequest("POST", "/comments/new", payload);

      // Add comment to the beginning
      setComments((s) => [newComment, ...s]);
      setName("");
      setCommentText("");
    } catch (error) {
      console.error("Comment submission error:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setCommenting(false);
    }
  };

  if (!visit) return <NotFound />;

   const toggleCommunentLikes = async (comment: any) => { 
      try {
        await apiRequest('POST', `/comments/${comment._id}/toggle-like`, {
          uuid: UUID,
        });
  
        setComments((s) => s.map((c) => {
          if (c._id === comment._id) {
            const hasLiked = c.likes?.includes(UUID);
            if (!hasLiked) {
              toast({
                title: "Comment liked",
                description: "You liked this comment",
              });
            } else {
              toast({
                title: "Like removed",
                description: "You unliked this comment",
              });
            }
            return {
              ...c,
              likes: hasLiked ? c.likes.filter((l: string) => l !== UUID) : [...(c.likes || []), UUID],
            };
          }
          return c;
        }));
        
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
  } 
  
   const toggleLikes = async (visitId: any) => { 
      try {
        await apiRequest('POST', `/visits/${visit._id}/toggle-like`, {
          uuid: UUID,
        });
  
        setVisit((s: any) => {
          if (s._id === visitId) {
            const hasLiked = s.likes?.includes(UUID);
            if (!hasLiked) {
              toast({
                title: "Post liked",
                description: "You liked this visit",
              });
            } else {
              toast({
                title: "Like removed",
                description: "You unliked this visit",
              });
            }
            return {
              ...s,
              likes: hasLiked ? s.likes.filter((l: string) => l !== UUID) : [...(s.likes || []), UUID],
            };
          }
          return s;
        }
        );
        
      } catch (error) {
         
      }
    }
   const logShares = async () => { 
      try {
        await apiRequest('POST', `/visits/${visit._id}/log-share`, {
          uuid: UUID,
        });

        setVisit((s: any) => {
          if (s._id === visit._id) {
            return {
              ...s,
              shares: [...(s.shares || []), UUID],
            };
          } 
          return s;
        });
  
        
      } catch (error) {
         
      }
  }

  const handleShareWithLink = async () => {
    await logShares();
    const visitLink = `${window.location.origin}/visits/${visit._id}`;
    try {
      await navigator.clipboard.writeText(visitLink);
      toast({
        title: "Link copied",
        description: "Visit link copied to clipboard",
      });
    } catch (error) {
      console.error('Failed to copy link to clipboard:', error);
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  }
   
  

  

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
          <div className="flex md:items-stretch md:col-span-1 h-64 sm:h-80 md:h-auto md:min-h-[420px]">
            <div
              className="w-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${visit.thumbnail?.url})` }}
            />
          </div>

          {/* Right: Details */}
          <div ref={scrollContainerRef} className="p-3 sm:p-4 md:p-6 overflow-y-auto md:col-span-1 max-h-screen sm:h-screen md:max-h-[700px] relative">
            <h1 className="text-xl sm:text-2xl font-bold">{visit.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {visit.community} — {visit.country}
            </p>

            <p className="mt-2 sm:mt-4 text-sm text-muted-foreground">{visit?.excerpt}</p>

            {/* Video (YouTube) */}
            {visit?.videoId && (
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
              <p>{visit?.content}</p>
            </div>

            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6">
              <div className="">
                <h3 className="font-semibold text-sm sm:text-base">Participants</h3>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
                  {visit?.participants && visit.participants.length > 0 ? (
                    visit.participants.slice(0, 3).map((p: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={p.photo?.url}
                          alt={p?.name}
                          className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{p?.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground truncate">{p?.role}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground">No participants listed.</div>
                  )}
                </div>
              </div>

              <div className="max-h-[200px] overflow-y-auto">
                <h3 className="font-semibold text-sm sm:text-base">Gallery</h3>
                {visit?.gallery && visit.gallery.length > 0 ? (
                  <div className="mt-2 sm:mt-3   grid grid-cols-2 sm:grid-cols-3 gap-2 transition-all">
                    {visit.gallery.map((img: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveImage(img);
                          setIsGalleryOpen(true);
                        }}
                        className="overflow-hidden rounded"
                      >
                        <img
                          src={img.url}
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
              <div className="flex justify-center sm:justify-end w-full gap-4 mb-1 text-xs sm:text-sm text-muted-foreground">
                {visit?.status === 'visited'  && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp onClick={() => toggleLikes(visit._id)}  
                      className={`    w-3 h-3 sm:w-4 sm:h-4 bottom-1 ${visit?.likes?.includes(UUID) ? "fill-primary text-primary" : "text-muted-foreground"} right-1  hover:shadow-lg hover:w-5 cursor-pointer`}
                      />
                    <span>Likes: {visit?.likes.length||0}</span>
                  </div>
                )}
                
                 
                <div className="flex items-center gap-1">
                    <Share2 onClick={()=> handleShareWithLink()} className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" />
                    <span>Shares: {visit?.shares?.length||0}</span>
                  </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            {canScroll && (
              <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col items-center justify-end pb-2 sm:pb-4 gap-1 animate-pulse">
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
        <h2 className="font-display text-lg sm:text-xl font-bold mb-3">Comments</h2>
        {!commentsActive ? (
          <div className="p-3 sm:p-4 bg-muted rounded-md text-xs sm:text-sm text-muted-foreground">
            Comments will activate on the day of the event ({new Date(visit.date).toLocaleDateString()}).
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <div className="text-sm text-muted-foreground">{comments.length} comment{comments.length !== 1 ? 's' : ''}</div>
            </div>

            <form onSubmit={handleAddComment} className="mb-4 grid grid-cols-1 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-md border border-border/50 bg-background text-sm"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 rounded-md border border-border/50 bg-background h-24 sm:h-28 resize-none text-sm"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={commenting}>
                  {!commenting ? "Post Comment" : <span className="flex items-center gap-2">Posting...<Loader className="w-4 h-4 animate-spin" /></span>}
                </Button>
              </div>
            </form>

            <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-auto">
              {comments.length === 0 && (
                <div className="text-xs sm:text-sm text-muted-foreground">No comments yet — be the first to comment.</div>
              )}
              {[...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((c, i) => (
                <div key={i} className="flex relative items-start gap-3 border-b-2 border-border/50 pb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {String(c.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">{new Date(c.createdAt).toLocaleString()}</div>
                    <div className="text-sm text-foreground">{c.comment}</div>
                  </div>
                  <span className="absolute flex gap-2 items-center justify-center top-0 right-0 text-xs text-muted-foreground">Likes: {c?.likes?.length || 0}</span>
                  <ThumbsUp onClick={() => toggleCommunentLikes(c)} className={`w-4 absolute bottom-1 ${c?.likes?.includes(UUID) ? 'fill-primary text-primary' : 'text-muted-foreground'} right-1 h-4 hover:shadow-lg hover:w-5 cursor-pointer`} />
                </div>
              ))}
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
                src={activeImage.url}
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
