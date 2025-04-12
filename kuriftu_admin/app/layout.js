import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from"../components/ui/sidebar"
import AdminSidebar from "../components/AdminSidebar"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kuriftu Resorts - Admin Portal",
  description: "Admin portal for Kuriftu Resorts Membership & Loyalty Program",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <div className="flex h-screen">
              <AdminSidebar />
              <div className="flex-1 ml-64 p-8 overflow-auto">{children}</div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
