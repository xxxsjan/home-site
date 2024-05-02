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
  CardHeader,
  Image,
} from "@nextui-org/react";

export default function Home() {
  const siteInfo = [
    {
      name: "前端文档库",
      href: "https://blog.dolam.fun",
      src: "/blog.png",
    },
    {
      name: "前端工具",
      href: "https://web-tool.dolam.fun",
      src: "/web-tool.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"></div>
      </div>
      <div className="w-full flex gap-4 flex-wrap justify-center">
        {siteInfo.map((item) => (
          <Card className="py-4" key={item.name}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{item.name}</p>

              {/* <small className="text-default-500">12 Tracks</small> */}
              {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Link isExternal href={item.href} color="success">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={item.src}
                  width={270}
                />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex animate-bounce">
        <Link
          isExternal
          className={
            buttonStyles({ variant: "bordered", radius: "full" }) +
            " animate-pulse"
          }
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
