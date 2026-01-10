"use client";

import { useState } from "react";
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
  ChevronDown
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

  const toggleExpanded = (name) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-background px-6">
          <div className="flex h-16 shrink-0 items-center border-b border-zinc-200 -mx-6 px-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground">BookExchange</span>
          </div>
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
                          <Button
                            onClick={() => toggleExpanded(item.name)}
                            variant="ghost"
                            className="w-full group flex items-center justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-x-3">
                              <item.icon className="h-6 w-6 shrink-0" />
                              {item.name}
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`} />
                          </Button>
                          {expandedItems[item.name] && (
                            <ul className="mt-1 ml-9 space-y-1">
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
                            </ul>
                          )}
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
      <div className={`relative z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-zinc-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <Button onClick={() => setSidebarOpen(false)} variant="ghost" className="-m-2.5 p-2.5">
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-foreground">BookExchange</span>
              </div>
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
                              <Button
                                onClick={() => toggleExpanded(item.name)}
                                variant="ghost"
                                className="w-full group flex items-center justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 cursor-pointer"
                              >
                                <div className="flex items-center gap-x-3">
                                  <item.icon className="h-6 w-6 shrink-0" />
                                  {item.name}
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`} />
                              </Button>
                              {expandedItems[item.name] && (
                                <ul className="mt-1 ml-9 space-y-1">
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
                                </ul>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with header */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            type="button"
            variant="ghost"
            className="-m-2.5 p-2.5 text-foreground/70 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="h-6 w-px bg-zinc-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-foreground/40 ml-3" />
              <input
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-foreground placeholder:text-foreground/40 focus:ring-0 sm:text-sm bg-transparent"
                placeholder="Search books, users, forums..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" className="-m-2.5 p-2.5 text-foreground/40 hover:text-foreground/60 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600" />
              </Button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-200" />

              <div className="relative">
                <Button variant="ghost" className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    JD
                  </div>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-foreground">John Doe</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="py-4 px-2 sm:px-3 lg:px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
