export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "xxxsjan - Home",
  description: "xxxsjan主站入口",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/xxxsjan",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
const host = "odep.xyz";
export const siteInfo = [
  {
    name: "前端文档库",
    href: `https://blog.${host}`,
    // href: "https://super-blog-navy.vercel.app",
    src: "/blog.png",
  },
  {
    name: "前端工具",
    href: `https://web-tool.${host}`,
    // href: "https://wen-tool.vercel.app",
    src: "/web-tool.png",
  },
  {
    name: "简书",
    href: "https://www.jianshu.com/u/2b406a3be47b",
    src: "/jianshu.png",
  },
  {
    name: "lobe-chat",
    // href: `https://lobe-chat.${host}`,
    href: "https://lobe-chat-nu-sepia.vercel.app",
    src: "/lobe-chat.png",
  },
];
