"use client"

import * as React from "react"
import { cn } from "../../lib/utils.js"

// Simple context for sidebar state
const SidebarContext = React.createContext({
  open: true,
  setOpen: () => {},
  isMobile: false
})

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = React.forwardRef(
  ({ children, defaultOpen = true, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(defaultOpen)
    const [isMobile, setIsMobile] = React.useState(false)

    // Check if mobile on client side
    React.useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkIfMobile()
      window.addEventListener("resize", checkIfMobile)
      
      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }, [])

    const contextValue = React.useMemo(
      () => ({
        open,
        setOpen,
        isMobile,
        toggleSidebar: () => setOpen(prev => !prev)
      }),
      [open, isMobile]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div ref={ref} className={cn("flex min-h-screen w-full", className)} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

export const Sidebar = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, isMobile } = useSidebar()
  
  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-20 h-screen bg-background border-r transition-all duration-300",
        open ? "w-64" : "w-0 -translate-x-full md:w-16 md:translate-x-0",
        className
      )}
      {...props}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 p-4 border-b", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto p-4", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-4 border-t mt-auto", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

export const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef(
  ({ className, asChild = false, isActive = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    
    return (
      <Comp
        ref={ref}
        data-active={isActive}
        className={cn(
          "flex w-full items-center rounded-md p-2 text-sm font-medium transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-2 my-2 h-px bg-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

export const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  
  return (
    <button
      ref={ref}
      onClick={toggleSidebar}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

