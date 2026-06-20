"use client"

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Menu,
  Mic,
  Play,
  Search,
  Upload,
  User,
  Settings,
  LogOut,
  Video,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSidebarCollapseStore } from "#/zustand/sidebarStore/useSidebarCollapsedState";


export function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const toggle_sidebar = useSidebarCollapseStore(state => state.toggleSidebar);
  const onClickHandler = () => {
    toggle_sidebar()};
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex h-14 items-center gap-2 px-3 sm:gap-4 sm:px-4">
        {/* Left: menu + logo */}
        {!mobileSearchOpen && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-foreground/20 dark:border-transparent hover:cursor-pointer"
              aria-label="Open menu"
              onClick={onClickHandler}
            >
              <Menu className="size-5" />
            </Button>
            <Link to="/" className="flex items-center gap-1.5" aria-label="VIDORA home">
              <span className="flex size-7 items-center justify-center rounded-full bg-white">
                <Play className="size-4 fill-current text-blue-700 rounded-full" />
              </span>
              <span className="text-lg font-bold tracking-tight text-blue-700">VIDORA</span>
            </Link>
          </div>
        )}

        {/* Center: search bar (desktop) */}
        <div className="hidden flex-1 items-center justify-center px-2 md:flex">
          <form
            role="search"
            className="flex h-10 w-full max-w-xl items-center rounded-full border border-border bg-secondary/40 focus-within:border-ring"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="search"
              placeholder="Search"
              className="h-full flex-1 rounded-l-full border-0 bg-transparent pl-4 pr-3 text-base shadow-none focus-visible:ring-0"
              aria-label="Search"
            />
            <Button
              type="submit"
              variant="secondary"
              className="flex h-full w-16 shrink-0 items-center justify-center rounded-l-none rounded-r-full border-l border-border"
              aria-label="Submit search"
            >
              <Search className="size-5" />
            </Button>
          </form>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-3 size-10 shrink-0 rounded-full border border-foreground/20 bg-secondary text-foreground hover:bg-secondary/80 dark:border-transparent"
                  aria-label="Search with voice"
                />
              }
            >
              <Mic className="size-5" />
            </TooltipTrigger>
            <TooltipContent>Search with voice</TooltipContent>
          </Tooltip>
        </div>

        {/* Mobile expanded search */}
        {mobileSearchOpen && (
          <form
            role="search"
            className="flex flex-1 items-center gap-2 md:hidden"
            onSubmit={(e) => e.preventDefault()}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full border border-foreground/20 dark:border-transparent"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
            >
              <X className="size-5" />
            </Button>
            <Input
              type="search"
              placeholder="Search"
              autoFocus
              className="h-10 flex-1 rounded-full"
              aria-label="Search"
            />
            <Button type="submit" size="icon" variant="secondary" className="rounded-full border border-foreground/20 dark:border-transparent" aria-label="Submit search">
              <Search className="size-5" />
            </Button>
          </form>
        )}

        {/* Right: actions */}
        {!mobileSearchOpen && (
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Mobile search trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-foreground/20 md:hidden dark:border-transparent"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="size-5" />
            </Button>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full border border-foreground/20 dark:border-transparent" aria-label="Upload video" />
                }
              >
                <Upload className="size-5" />
              </TooltipTrigger>
              <TooltipContent>Upload</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon" className="relative rounded-full border border-foreground/20 dark:border-transparent" aria-label="Notifications" />
                }
              >
                <Bell className="size-5" />
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full border-2 border-background bg-destructive text-[9px] font-semibold leading-none text-white">
                  3
                </span>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

            {/* <ThemeToggle /> */}

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="ml-1 rounded-full border border-foreground/20 outline-none ring-ring focus-visible:ring-2 dark:border-transparent" aria-label="Account menu" />
                }
              >
                <Avatar className="size-8">
                  <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                  <AvatarFallback>VD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col px-1.5 py-1">
                  <span className="text-sm font-semibold">Alex Rivera</span>
                  <span className="text-xs text-muted-foreground">@alexrivera</span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="size-4" />
                  Your channel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="size-4" />
                  Your videos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  )
}
