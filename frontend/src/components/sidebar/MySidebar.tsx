import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,                                                                
  IconSettings,
  IconUserBolt,
  IconMessage,
  IconApple,
  IconBarbell,                                                                                                                                                                                                                                          
  IconSearch                                                                                                      
} from "@tabler/icons-react";
import { handleLogout } from "@/services/authentication/handleLogout";

const MySidebar = () => {
  const router = useRouter();
  const onLogoutClick = () => {
    handleLogout(router);
  };
  const links = [
    {
      label: "Feed",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    { 
      label: "Search", 
      href: "/search", 
      icon: <IconSearch /> 
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Workouts",
      href: "#",
      icon: (
        <IconBarbell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Nutrition",
      href: "#",
      icon: (
        <IconApple className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Messages",
      href: "#",
      icon: (
        <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
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
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className=" h-screen justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            Fitter Health
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </>
  );
}

export default MySidebar;
