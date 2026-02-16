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
import { Send, Search } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageFilter, setMessageFilter] = useState<
    "all" | "new" | "read" | "replied" | "archived"
  >("new");
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMessages(mockMessages);
    if (mockMessages.length > 0) {
      setSelectedConversation(mockMessages[0]);
    }
    setIsLoading(false);
  }, []);

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
      return msg.isRead;
    } else if (messageFilter === "replied") {
      return msg.reply?.reply && msg.reply.reply.length > 0;
    } else if (messageFilter === "archived") {
      return msg.isArchived;
    }

    return true;
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </AdminLayout>
    );
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
                  Read ({messages.filter((m) => m.isRead).length})
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
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedConversation(msg)}
                  className={`w-full text-left p-4 border-b border-border hover:bg-secondary hover:text-white transition-colors ${
                    selectedConversation?.id === msg.id ? "bg-secondary" : ""
                  }`}
                >
                  <p className="font-semibold text-sm">{msg.name}</p>
                  <p className="text-xs text-muted-foreground truncate hover:text-white">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 hover:text-white">
                    {new Date(msg.date).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message View */}
          {selectedConversation ? (
            <div className="lg:col-span-2 flex flex-col">
              {/* Header */}
              <div className="border-b border-border p-4">
                <h3 className="font-semibold">{selectedConversation.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.email} • {selectedConversation.phone}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(selectedConversation.date).toLocaleString()}
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-muted-foreground/5">
                <div className="space-y-4">
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">
                      {selectedConversation.subject}
                    </p>
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-lg p-3 max-w-md">
                        <p className="text-sm text-white">
                          {selectedConversation.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedConversation.reply?.reply && (
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-md">
                        <p className="text-sm">
                          {selectedConversation.reply.reply}
                        </p>
                        <p className="text-xs mt-2 opacity-80">
                          {new Date(
                            selectedConversation.reply.repliedOn,
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Input */}
              <div className="border-t border-border p-4 space-y-2">
                <Textarea
                  placeholder="Type your reply..."
                  className="min-h-20"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a conversation to view
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
