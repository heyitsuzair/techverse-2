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
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Send message logic here
      setMessageText("");
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Hide sidebar on mobile when conversation is selected
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.exchangeContext.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <Text variant="h1" className="mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:w-7 lg:w-8 lg:h-8" />
            Messages
          </Text>
          <Text variant="body" className="text-zinc-600 text-xs sm:text-sm lg:text-base">
            Chat with book exchange partners
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Conversations Sidebar */}
          <div className={`lg:col-span-1 ${!showSidebar && selectedConversation ? 'hidden lg:block' : ''}`}>
            <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-190px)] lg:h-[calc(100vh-220px)]">
              <CardContent className="pt-3 sm:pt-4 lg:pt-6 h-full flex flex-col">
                {/* Search */}
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 text-xs sm:text-sm py-1.5 sm:py-2"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto -mx-3 sm:-mx-4">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 flex items-start gap-2 sm:gap-2.5 lg:gap-3 hover:bg-zinc-50 transition-colors border-l-4 text-left ${
                        selectedConversation.id === conversation.id
                          ? "border-l-primary bg-primary/10"
                          : "border-l-transparent"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm lg:text-base">
                          {conversation.user.avatar}
                        </div>
                        {conversation.user.online && (
                          <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0 flex flex-col gap-0.5 sm:gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <Text variant="body" className="font-semibold text-[11px] sm:text-xs lg:text-sm truncate flex-1">
                            {conversation.user.name}
                          </Text>
                          <Text variant="caption" className="text-zinc-500 text-[9px] sm:text-[10px] lg:text-xs flex-shrink-0">
                            {conversation.timestamp}
                          </Text>
                        </div>
                        <Text variant="caption" className="text-zinc-600 truncate text-[10px] sm:text-xs leading-tight">
                          {conversation.lastMessage}
                        </Text>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <Badge variant="default" className="text-[9px] sm:text-[10px] lg:text-xs truncate max-w-[100px] sm:max-w-[120px]">
                            {conversation.exchangeContext.book}
                          </Badge>
                          {conversation.unread > 0 && (
                            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] lg:text-xs flex items-center justify-center flex-shrink-0">
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Window */}
          <div className={`lg:col-span-3 ${showSidebar && !selectedConversation ? 'hidden lg:block' : ''}`}>
            <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-190px)] lg:h-[calc(100vh-220px)] flex flex-col">
              {/* Chat Header */}
              <div className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 border-b border-zinc-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 min-w-0 flex-1">
                    {/* Back button on mobile */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden p-1.5 sm:p-2"
                      onClick={() => setShowSidebar(true)}
                    >
                      ←
                    </Button>
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm lg:text-base">
                        {selectedConversation.user.avatar}
                      </div>
                      {selectedConversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Text variant="h4" className="text-xs sm:text-sm lg:text-base truncate">{selectedConversation.user.name}</Text>
                      <Text variant="caption" className="text-zinc-600 text-[10px] sm:text-xs lg:text-sm">
                        {selectedConversation.user.online ? "Online" : "Offline"}
                      </Text>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0 p-1.5 sm:p-2">
                    <MoreVertical className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
                  </Button>
                </div>

                {/* Exchange Context */}
                <div className="mt-2.5 sm:mt-3 lg:mt-4 p-2 sm:p-2.5 lg:p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Text variant="body" className="font-semibold text-[11px] sm:text-xs lg:text-sm truncate">
                        {selectedConversation.exchangeContext.book}
                      </Text>
                      <Text variant="caption" className="text-primary text-[9px] sm:text-[10px] lg:text-xs">
                        Exchange Status: {selectedConversation.exchangeContext.status}
                      </Text>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0 text-[10px] sm:text-xs lg:text-sm px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 lg:py-2">
                      <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 lg:mr-1" />
                      <span className="hidden lg:inline">View Details</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4">
                <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
                  {MOCK_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 ${
                            message.sender === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-zinc-100 text-zinc-900"
                          }`}
                        >
                          <Text variant="body" className="text-[11px] sm:text-xs lg:text-sm break-words">
                            {message.content}
                          </Text>
                        </div>
                        <div className={`flex items-center gap-1 mt-0.5 sm:mt-1 ${
                          message.sender === "me" ? "justify-end" : "justify-start"
                        }`}>
                          <Text variant="caption" className="text-zinc-500 text-[9px] sm:text-[10px] lg:text-xs">
                            {message.timestamp}
                          </Text>
                          {message.sender === "me" && (
                            message.read ? (
                              <CheckCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                            ) : (
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-400" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 border-t border-zinc-200">
                <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-2.5 lg:gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2"
                  />
                  <Button type="submit" variant="primary" className="px-2.5 sm:px-3 lg:px-4 flex-shrink-0">
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
    </div>
  );
}
