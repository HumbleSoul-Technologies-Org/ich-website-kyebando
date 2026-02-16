import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getMessages } from "@/lib/adminApi";
import { Send, Search } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getMessages();
      setMessages(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const filteredMessages = messages.filter((msg) =>
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p className="text-muted-foreground mt-1">Communicate with community members</p>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px] border border-border rounded-lg overflow-hidden">
          {/* Conversation List */}
          <div className="border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedConversation(msg)}
                  className={`w-full text-left p-4 border-b border-border hover:bg-secondary transition-colors ${
                    selectedConversation?.id === msg.id ? "bg-secondary" : ""
                  }`}
                >
                  <p className="font-semibold text-sm">{msg.sender}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {msg.preview}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{msg.date}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Message View */}
          {selectedConversation ? (
            <div className="lg:col-span-2 flex flex-col">
              {/* Header */}
              <div className="border-b border-border p-4">
                <h3 className="font-semibold">{selectedConversation.sender}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.date}
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-accent/50">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Thank you for reaching out to our community
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-lg p-3 max-w-xs">
                      <p className="text-sm">{selectedConversation.preview}</p>
                    </div>
                  </div>
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
              <p className="text-muted-foreground">Select a conversation to view</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
