import {
  Home,
  Sigma,
  Network,
  FlaskConical,
  GraduationCap,
  BookOpen,
  FolderOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  //{
  //   title: "Mathematics",
  //   url: "/mathematics",
  //   icon: Sigma,
  // },
  // {
  //   title: "Computer Science",
  //   url: "/computer-science",
  //   icon: Network,
  //},
  {
    title: "Research",
    url: "/research",
    icon: FlaskConical,
  },
]

const workspaceItems = [
  {
    title: "Teaching",
    url: "/teaching",
    icon: GraduationCap,
  },
  {
    title: "Diary",
    url: "/diary",
    icon: BookOpen,
  },
  // {
  //   title: "Projects",
  //   url: "/projects",
  //   icon: FolderOpen,
  // },
]

export function AppSidebar() {
  return (
    <Sidebar
      variant="inset"
      className="border-r border-white/10"
    >
      <SidebarContent className="bg-zinc-950">

        <SidebarGroup className="pt-6">

          <SidebarGroupLabel className="px-4 text-base font-semibold tracking-widest text-zinc-400">
            JADE
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-4">

            <SidebarMenu className="gap-1">

              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton
                    render={<a href={item.url} />}
                    tooltip={item.title}
                    className="h-11 px-4 text-base text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">

          <SidebarGroupLabel className="px-4 text-xs uppercase tracking-widest text-zinc-500">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-3">

            <SidebarMenu className="gap-1">

              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton
                    render={<a href={item.url} />}
                    tooltip={item.title}
                    className="h-11 px-4 text-base text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="bg-zinc-950">
        <div className="px-4 py-4 text-sm text-zinc-500">
          Mathematics · CS · Research
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}