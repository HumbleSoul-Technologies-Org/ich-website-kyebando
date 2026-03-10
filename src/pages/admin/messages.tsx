import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messages as mockMessages } from "@/lib/mockData";
import { Send, Search, MailOpen, Archive, Loader2, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { set } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";


export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageFilter, setMessageFilter] = useState<
      "new" | "read" | "replied" | "archived"
  >("new");
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: messageData, isLoading: loadingMessages } = useQuery<any>({
    queryKey: ["messages","all"],
  })

  useEffect(() => {
     if (messageData) {
      setMessages(messageData);
     }
  }, [messageData]);

  const filteredMessages = messages.filter((msg) => {
    // Filter by search term
    if (
      searchTerm &&
      !msg.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by message status
    if (messageFilter === "new") {
      return !msg.isRead;
    } else if (messageFilter === "read") {
      return msg.isRead && !msg.isArchived;
    } else if (messageFilter === "replied") {
      return msg.reply?.reply && msg.reply.reply.length > 0;
    } else if (messageFilter === "archived") {
      return msg.isArchived;
    }

    return true;
  });

  if (loadingMessages) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </AdminLayout>
    );
  }

  const handleReadMessage = async(msgId:string) => { 
    try {

      await apiRequest('POST', `/messages/${msgId}/mark-read` );
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === msgId ? { ...msg, isRead: true } : msg,
        )
      );
      
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  const handleArchiveToggle = async (msgId: string) => { 
    try {
      await apiRequest('POST', `/messages/${msgId}/toggle-archive`);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === msgId ? { ...msg, isArchived: !msg.isArchived } : msg,
        )
      );
      setSelectedConversation(null)
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  const handleSendReply = async () => { 
    try {
      if (!replyText.trim() || !selectedConversation) return;
      setReplyLoading(true);

      await apiRequest('POST', `/messages/${selectedConversation._id}/reply`, { reply: replyText });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedConversation._id ? { ...msg, reply: { ...msg.reply, reply: replyText } } : msg,
        )
      );
      setReplyText("");
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      setReplyLoading(false);
    }
  }
  const handleDeleteMessage = async (msgId: string) => {
    try {
      await apiRequest('DELETE', `/messages/${msgId}/delete`);
      setMessages((prev) => prev.filter((msg) => msg._id !== msgId));
      setSelectedConversation(null);
    } catch (error) {
      console.log('====================================' );
      console.log(error);
      console.log('====================================' );
    }
  }
  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Communicate with community members
          </p>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px] border border-border rounded-lg overflow-hidden">
          {/* Conversation List */}
          <div className="border-r border-border flex flex-col">
            <div className="p-4 border-b border-border space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={messageFilter === "new" ? "default" : "outline"}
                  onClick={() => setMessageFilter("new")}
                  size="sm"
                >
                  New ({messages.filter((m) => !m.isRead).length})
                </Button>
                <Button
                  variant={messageFilter === "read" ? "default" : "outline"}
                  onClick={() => setMessageFilter("read")}
                  size="sm"
                >
                  Read ({messages.filter((m) => m.isRead && !m.isArchived).length})
                </Button>
                <Button
                  variant={messageFilter === "replied" ? "default" : "outline"}
                  onClick={() => setMessageFilter("replied")}
                  size="sm"
                >
                  Replied (
                  {
                    messages.filter(
                      (m) => m.reply?.reply && m.reply.reply.length > 0,
                    ).length
                  }
                  )
                </Button>
                <Button
                  variant={messageFilter === "archived" ? "default" : "outline"}
                  onClick={() => setMessageFilter("archived")}
                  size="sm"
                >
                  Archived ({messages.filter((m) => m.isArchived).length})
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((msg, idx) => (
                <motion.button
                  key={msg._id}
                  onClick={() => { setSelectedConversation(msg); if (!msg.isRead) handleReadMessage(msg._id); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-full text-left p-4 border-b border-border flex items-start gap-3 hover:bg-secondary hover:text-white hover:shadow-lg hover:scale-105 transition-all ${
                    selectedConversation?._id === msg._id ? "bg-secondary text-white" : "bg-white"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {msg.isRead ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm truncate">
                      {msg.subject || msg.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {msg.message.length > 80
                        ? msg.message.substring(0, 80) + "..."
                        : msg.message}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Message View */}
          {selectedConversation ? (
            <motion.div
              key={selectedConversation._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 flex flex-col overflow-y-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-inner"
            >
              {/* Header */}
              <div className="border-b border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {selectedConversation.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.email} • {selectedConversation.phone}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(selectedConversation.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArchiveToggle(selectedConversation._id)}
                      className="gap-2"
                    >
                      <Archive className="h-4 w-4" />
                      {selectedConversation.isArchived ? "Unarchive" : "Archive"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteMessage(selectedConversation._id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-muted-foreground/5">
                <div className="space-y-4">
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">
                      {selectedConversation.subject}
                    </p>
                    <div className="flex justify-start">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-secondary rounded-lg p-3 max-w-md"
                      >
                        <p className="text-sm text-white">
                          {selectedConversation.message}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  {selectedConversation.reply?.reply && (
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-primary text-primary-foreground rounded-lg p-3 max-w-md"
                      >
                        <p className="text-sm">
                          {selectedConversation.reply.reply}
                        </p>
                        <p className="text-xs mt-2 opacity-80">
                          {new Date(
                            selectedConversation.reply.repliedOn,
                          ).toLocaleString()}
                        </p>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-t border-border p-4 space-y-2"
              >
                <Textarea
                  placeholder="Type your reply..."
                  className="min-h-20"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: replyLoading ? 1 : 1.03 }}
                  whileTap={{ scale: replyLoading ? 1 : 0.97 }}
                  className="w-full"
                >
                  <Button className="w-full gap-2"  onClick={handleSendReply} disabled={replyLoading}>
                    {replyLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {replyLoading ? "Sending..." : "Send Reply"}
                  </Button>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2 flex items-center justify-center"
            >
                <span className="text-center items-center justify-center space-y-4">
                  <MailOpen className="w-16 h-16 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a message to view more details
                  </p>
                </span>
            </motion.div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
