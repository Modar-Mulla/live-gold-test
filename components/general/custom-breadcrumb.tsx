"use client";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function CustomBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const links = paths.map((path) => ({ label: path, href: `/${path}` }));

  return (
    <Breadcrumb className="p-5 bg-gray-100 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-gray-400" href={"/"}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map((link, index) => {
          if (links.length - 1 == index) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink className="text-secondary" href={link.href}>
                  {link.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          } else {
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-gray-400" href={link.href}>
                    {link.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash className="text-gray-400" />
                </BreadcrumbSeparator>
              </Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
