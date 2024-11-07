"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconBell,
  IconBarbell,
  IconHelpCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { handleLogout } from "@/services/authentication/handleLogout";

const MySidebar = () => {
  const router = useRouter();
  const onLogoutClick = () => {
    handleLogout(router);
  };

  const links = [
    {
      label: "Account Settings",
      href: "/settings/account",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Notifications",
      href: "/settings/notifications",
      icon: <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Fitness Goals",
      href: "/settings/goals",
      icon: <IconBarbell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "App Settings",
      href: "/settings/app",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Support & Help",
      href: "/support",
      icon: <IconHelpCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <IconInfoCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0" />,
      onClick: onLogoutClick,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar Container */}
      <div className="h-screen w-[251px] border-r border-gray-700 flex flex-col">
        {/* Header Section */}
        <div className="text-white py-4 px-6">
          <h1 className="text-2xl font-semibold">Fitter Health</h1>
        </div>

        {/* Sidebar Body */}
        <div className="flex w-[260px] flex-col flex-1 overflow-auto">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="text-white flex flex-col gap-6 p-6 rounded-lg">
              <div className="flex flex-col gap-4">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default MySidebar;
