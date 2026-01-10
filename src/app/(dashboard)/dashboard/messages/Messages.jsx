"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent,
  Button,
  Text,
  Input,
  Badge
} from "@/components/ui";
import { 
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  BookOpen,
  Package,
  Check,
  CheckCheck
} from "lucide-react";

// Mock Data
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    user: {
      name: "John Anderson",
      avatar: "JA",
      online: true
    },
    lastMessage: "Yes, the book is still available!",
    timestamp: "2 min ago",
    unread: 2,
    exchangeContext: {
      book: "Moby Dick",
      status: "Discussing"
    }
  },
  {
    id: 2,
    user: {
      name: "Sarah Mitchell",
      avatar: "SM",
      online: false
    },
    lastMessage: "Thanks for the exchange! Book arrived today.",
    timestamp: "1 hour ago",
    unread: 0,
    exchangeContext: {
      book: "The Great Gatsby",
      status: "Completed"
    }
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      avatar: "MJ",
      online: true
    },
    lastMessage: "Can we meet at the downtown exchange point?",
    timestamp: "3 hours ago",
    unread: 1,
    exchangeContext: {
      book: "1984",
      status: "In Progress"
    }
  },
  {
    id: 4,
    user: {
      name: "Emily White",
      avatar: "EW",
      online: false
    },
    lastMessage: "I'll ship it tomorrow morning",
    timestamp: "Yesterday",
    unread: 0,
    exchangeContext: {
      book: "Pride and Prejudice",
      status: "Shipping"
    }
  }
];

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "them",
    content: "Hi! I'm interested in your book 'Moby Dick'",
    timestamp: "10:30 AM",
    read: true
  },
  {
    id: 2,
    sender: "me",
    content: "Hello! Yes, it's still available. It's in excellent condition.",
    timestamp: "10:32 AM",
    read: true
  },
  {
    id: 3,
    sender: "them",
    content: "Great! What's the exchange point value?",
    timestamp: "10:35 AM",
    read: true
  },
  {
    id: 4,
    sender: "me",
    content: "180 points. Would you like to see more photos?",
    timestamp: "10:36 AM",
    read: true
  },
  {
    id: 5,
    sender: "them",
    content: "Yes please! Also, where are you located?",
    timestamp: "10:40 AM",
    read: true
  },
  {
    id: 6,
    sender: "me",
    content: "I'm in Boston, MA. I can ship or we can meet at a local exchange point.",
    timestamp: "10:42 AM",
    read: false
  },
  {
    id: 7,
    sender: "them",
    content: "Perfect! I'm also in Boston. Let's arrange a meetup.",
    timestamp: "10:45 AM",
    read: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(MOCK_CONVERSATIONS[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Send message logic here
      setMessageText("");
    }
  };

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.exchangeContext.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <MessageCircle className="w-8 h-8" />
            Messages
          </Text>
          <Text variant="body" className="text-zinc-600">
            Chat with book exchange partners
          </Text>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-200px)]">
              <CardContent className="pt-6 h-full flex flex-col">
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 text-sm"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto -mx-4">
                  {filteredConversations.map((conversation) => (
                    <Button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      variant="ghost"
                      className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-zinc-50 transition-colors border-l-4 ${
                        selectedConversation.id === conversation.id
                          ? "border-l-primary bg-primary/10"
                          : "border-l-transparent"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                          {conversation.user.avatar}
                        </div>
                        {conversation.user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <Text variant="body" className="font-semibold text-sm truncate">
                            {conversation.user.name}
                          </Text>
                          <Text variant="caption" className="text-zinc-500 text-xs flex-shrink-0 ml-2">
                            {conversation.timestamp}
                          </Text>
                        </div>
                        <Text variant="caption" className="text-zinc-600 truncate block mb-1">
                          {conversation.lastMessage}
                        </Text>
                        <div className="flex items-center justify-between">
                          <Badge variant="default" className="text-xs">
                            {conversation.exchangeContext.book}
                          </Badge>
                          {conversation.unread > 0 && (
                            <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Window */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-zinc-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                        {selectedConversation.user.avatar}
                      </div>
                      {selectedConversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <Text variant="h4">{selectedConversation.user.name}</Text>
                      <Text variant="caption" className="text-zinc-600">
                        {selectedConversation.user.online ? "Online" : "Offline"}
                      </Text>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                {/* Exchange Context */}
                <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <Text variant="body" className="font-semibold text-sm">
                        {selectedConversation.exchangeContext.book}
                      </Text>
                      <Text variant="caption" className="text-primary">
                        Exchange Status: {selectedConversation.exchangeContext.status}
                      </Text>
                    </div>
                    <Button variant="outline" size="sm">
                      <Package className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {MOCK_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-zinc-100 text-zinc-900"
                          }`}
                        >
                          <Text variant="body" className="text-sm">
                            {message.content}
                          </Text>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${
                          message.sender === "me" ? "justify-end" : "justify-start"
                        }`}>
                          <Text variant="caption" className="text-zinc-500 text-xs">
                            {message.timestamp}
                          </Text>
                          {message.sender === "me" && (
                            message.read ? (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            ) : (
                              <Check className="w-3 h-3 text-zinc-400" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="px-6 py-4 border-t border-zinc-200">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
