"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LinkWithProgress, Button } from "@/components/ui";
import routes from "@/config/routes";
import {
  LayoutDashboard,
  BookOpen,
  Store,
  Heart,
  ArrowLeftRight,
  Coins,
  MapPin,
  MessageSquare,
  Mail,
  User,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: routes.dashboard.index, icon: LayoutDashboard },
  { 
    name: "Books", 
    icon: BookOpen,
    children: [
      { name: "Add Book", href: routes.dashboard.books.add },
      { name: "My Books", href: routes.dashboard.books.myBooks },
      { name: "QR History", href: routes.dashboard.books.qrHistory },
    ]
  },
  { name: "Marketplace", href: routes.marketplace, icon: Store },
  { name: "Wishlist", href: routes.dashboard.wishlist, icon: Heart },
  { 
    name: "Exchange", 
    icon: ArrowLeftRight,
    children: [
      { name: "Request Exchange", href: routes.dashboard.exchange.request },
      { name: "Track Exchange", href: routes.dashboard.exchange.tracking },
    ]
  },
  { name: "Buy Points", href: routes.dashboard.points.buy, icon: Coins },
  { name: "Add Stall", href: routes.dashboard.stalls.add, icon: MapPin },
  { name: "Forums", href: routes.dashboard.forums, icon: MessageSquare },
  { name: "Messages", href: routes.dashboard.messages, icon: Mail },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleExpanded = (name) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Exchange Request",
      message: "Sarah wants to exchange \"1984\" for your book",
      time: "5 min ago",
      read: false,
      type: "exchange"
    },
    {
      id: 2,
      title: "Book Added to Wishlist",
      message: "Someone added your \"The Great Gatsby\" to their wishlist",
      time: "1 hour ago",
      read: false,
      type: "wishlist"
    },
    {
      id: 3,
      title: "Exchange Completed",
      message: "Your exchange with John has been completed successfully",
      time: "2 hours ago",
      read: true,
      type: "success"
    },
    {
      id: 4,
      title: "New Forum Reply",
      message: "Alex replied to your post in \"Book Recommendations\"",
      time: "1 day ago",
      read: true,
      type: "forum"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-background px-6">
          <LinkWithProgress href={routes.home} className="flex h-16 shrink-0 items-center border-b border-zinc-200 -mx-6 px-6 cursor-pointer hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground">BookExchange</span>
          </LinkWithProgress>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <LinkWithProgress
                          href={item.href}
                          className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </LinkWithProgress>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleExpanded(item.name)}
                            className="w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            <span className="flex-1 text-left">{item.name}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {expandedItems[item.name] && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-1 ml-9 space-y-1">
                                  {item.children.map((child) => (
                                    <li key={child.name}>
                                      <LinkWithProgress
                                        href={child.href}
                                        className="block rounded-md py-2 pr-2 pl-3 text-sm leading-6 text-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors"
                                      >
                                        {child.name}
                                      </LinkWithProgress>
                                    </li>
                                  ))}
                                </div>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <LinkWithProgress
                  href={routes.dashboard.profile}
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-primary/5 border-t border-zinc-200"
                >
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    JD
                  </div>
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">John Doe</span>
                </LinkWithProgress>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-zinc-900/80 z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-0 flex z-50 lg:hidden pointer-events-none">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative mr-16 flex w-full max-w-xs flex-1 pointer-events-auto"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <Button onClick={() => setSidebarOpen(false)} variant="ghost" className="-m-2.5 p-2.5">
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2">
                  <LinkWithProgress href={routes.home} className="flex h-16 shrink-0 items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSidebarOpen(false)}>
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="ml-2 text-xl font-bold text-foreground">BookExchange</span>
                  </LinkWithProgress>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              {!item.children ? (
                                <LinkWithProgress
                                  href={item.href}
                                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5"
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" />
                                  {item.name}
                                </LinkWithProgress>
                              ) : (
                                <>
                                  <button
                                    onClick={() => toggleExpanded(item.name)}
                                    className="w-full group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 cursor-pointer"
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" />
                                    <span className="flex-1 text-left">{item.name}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`} />
                                  </button>
                                  <AnimatePresence>
                                    {expandedItems[item.name] && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="mt-1 ml-9 space-y-1">
                                          {item.children.map((child) => (
                                            <li key={child.name}>
                                              <LinkWithProgress
                                                href={child.href}
                                                className="block rounded-md py-2 pr-2 pl-3 text-sm leading-6 text-foreground/60 hover:text-primary hover:bg-primary/5"
                                                onClick={() => setSidebarOpen(false)}
                                              >
                                                {child.name}
                                              </LinkWithProgress>
                                            </li>
                                          ))}
                                        </div>
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area with header */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-2 sm:gap-x-3 border-b border-zinc-200 bg-background px-3 sm:px-4 lg:px-8 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            className="-m-2 p-2 text-foreground/70 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <div className="h-6 w-px bg-zinc-200 lg:hidden" />

          <div className="flex flex-1 gap-x-2 sm:gap-x-3 self-stretch min-w-0">
            <form className="relative flex flex-1 items-center min-w-0" action="#" method="GET">
              <div className="relative w-full max-w-2xl">
                <Search className="pointer-events-none absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-foreground/40" />
                <input
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 sm:py-2 pl-8 sm:pl-10 pr-2 sm:pr-4 text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Search books..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
            <div className="flex items-center gap-x-2 sm:gap-x-3">
              <div className="relative flex items-center">
                <Button 
                  variant="ghost" 
                  className="p-2 text-foreground/40 hover:text-foreground/60 relative flex items-center justify-center"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                  )}
                </Button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setNotificationsOpen(false)}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 z-50 w-screen max-w-sm sm:max-w-md"
                      >
                        <div className="rounded-lg bg-background shadow-lg ring-1 ring-zinc-200 overflow-hidden">
                          {/* Header */}
                          <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs h-auto p-1 text-primary hover:text-primary/80"
                              onClick={() => setNotificationsOpen(false)}
                            >
                              Mark all as read
                            </Button>
                          </div>

                          {/* Notifications List */}
                          <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                              notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50 cursor-pointer transition-colors ${
                                    !notification.read ? 'bg-primary/5' : ''
                                  }`}
                                  onClick={() => setNotificationsOpen(false)}
                                >
                                  <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                      {notification.type === 'exchange' && (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                          <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                                        </div>
                                      )}
                                      {notification.type === 'wishlist' && (
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                          <Heart className="w-4 h-4 text-purple-600" />
                                        </div>
                                      )}
                                      {notification.type === 'success' && (
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        </div>
                                      )}
                                      {notification.type === 'forum' && (
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                          <MessageSquare className="w-4 h-4 text-orange-600" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-foreground">
                                        {notification.title}
                                      </p>
                                      <p className="text-sm text-foreground/60 mt-0.5">
                                        {notification.message}
                                      </p>
                                      <p className="text-xs text-foreground/40 mt-1">
                                        {notification.time}
                                      </p>
                                    </div>
                                    {!notification.read && (
                                      <div className="flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center text-foreground/60">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-foreground/20" />
                                <p className="text-sm">No notifications yet</p>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          {notifications.length > 0 && (
                            <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50">
                              <button className="text-sm text-primary hover:text-primary/80 font-medium w-full text-center">
                                View all notifications
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-200" />

              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="-m-1 sm:-m-1.5 flex items-center p-1 sm:p-1.5"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-xs sm:text-sm font-bold">
                    JD
                  </div>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-3 text-sm font-semibold leading-6 text-foreground">John Doe</span>
                  </span>
                </Button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setProfileOpen(false)}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 z-50 w-56"
                      >
                        <div className="rounded-lg bg-background shadow-lg ring-1 ring-zinc-200 overflow-hidden">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-zinc-200">
                            <p className="text-sm font-semibold text-foreground">John Doe</p>
                            <p className="text-xs text-foreground/60 mt-0.5">john.doe@example.com</p>
                          </div>

                          {/* Menu Items */}
                          <div className="py-1">
                            <LinkWithProgress
                              href={routes.dashboard.profile}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-zinc-50 transition-colors"
                              onClick={() => setProfileOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>My Profile</span>
                            </LinkWithProgress>
                          </div>

                          {/* Logout */}
                          <div className="border-t border-zinc-200">
                            <button
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              onClick={() => {
                                setProfileOpen(false);
                              }}
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign out</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-4 sm:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
