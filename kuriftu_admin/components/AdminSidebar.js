"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, Users, MessageSquare, Award, Coins, Tag, MessageCircle, Settings, LogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "../components/ui/sidebar"

const AdminSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "User Management", path: "/users" },
    { icon: MessageSquare, label: "Review Analysis", path: "/reviews" },
    { icon: Award, label: "Membership Tiers", path: "/membership-tiers" },
    { icon: Coins, label: "Loyalty Coins", path: "/loyalty-coins" },
    { icon: Tag, label: "Discounts & Offers", path: "/discounts" },
    { icon: MessageCircle, label: "Feedback", path: "/feedback" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex justify-center mb-4">
          {/* If you don't have the logo image yet, comment this out or use a placeholder */}
          {/* <Image src="/logo.png" alt="Kuriftu Resorts Logo" width={180} height={80} className="object-contain" /> */}
          <h1 className="text-xl font-bold">Kuriftu Resorts</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link href={item.path} className="w-full">
                <SidebarMenuButton isActive={pathname === item.path}>
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-red-500">
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar

