"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Nav({ links, isCollapsed }) {
  const router = useRouter();
  const pathName = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemClick = (link, e) => {
    if (link.onClick) {
      e.preventDefault();
      link.onClick();
    } else {
      router.push(link.href);
    }
  };

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 pt-10 data-[collapsed=true]:py-6 data-[collapsed=true]:pt-12"
      >
        <nav className="grid gap-1 pl-0 pr-4 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-1">
          {links.map((link, index) => (
            <div key={index}>
              {/* Top-level menu item */}
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={(e) => handleItemClick(link, e)}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-10 w-10 cursor-pointer",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div>
                  {link.submenu ? (
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "sm",
                        }),
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start flex items-center w-full mb-1"
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.title}
                      <span className="ml-auto">
                        {openMenus[index] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  ) : (
                    <div
                      onClick={(e) => handleItemClick(link, e)}
                      className={cn(
                        buttonVariants({
                          variant: link.href === pathName ? "default" : "ghost",
                          size: "sm",
                        }),
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start flex items-center w-full mb-1 cursor-pointer"
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.title}
                    </div>
                  )}

                  {/* Submenu */}
                  {link.submenu && (
                    <div
                      className={cn(
                        "ml-4 flex-col space-y-2 overflow-hidden transition-max-height duration-300 ease-in-out",
                        openMenus[index] ? "max-h-screen" : "max-h-0"
                      )}
                    >
                      {link.submenu.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink.href}
                          className={cn(
                            buttonVariants({
                              variant:
                                subLink.href === pathName ? "default" : "ghost",
                              size: "sm",
                            }),
                            "justify-start flex items-center w-full "
                          )}
                        >
                          <subLink.icon
                            className="mr-1"
                            style={{ width: "12px", height: "12px" }}
                          />
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}
