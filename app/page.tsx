"use client";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {
  Link,
  Button,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";

export default function Home() {
  const siteInfo = [
    {
      name: "前端文档库",
      href: "https://blog.dolam.fun",
    },
    {
      name: "前端工具",
      href: "https://web-tool.dolam.fun",
    },
    {
      name: "崩铁助手",
      href: "https://star-rail.dolam.fun",
    },
    // {
    //   name: "原神素材",
    //   href: "https://genshin-home.vercel.app/",
    // },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
          <Listbox aria-label="Actions" onAction={() => {}}>
            {siteInfo.map((item) => {
              return (
                <ListboxItem key={item.name}>
                  <Link
                    isExternal
                    href={item.href}
                    showAnchorIcon
                    color="success"
                  >
                    {item.name}
                  </Link>
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      {/* <div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div> */}
    </section>
  );
}
