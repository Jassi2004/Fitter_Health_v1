"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconMessage,
    IconApple,
    IconBarbell,
    IconSearch,
} from "@tabler/icons-react";
import { handleLogout } from "@/services/authentication/handleLogout";

const Navbar = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const onLogoutClick = () => {
        handleLogout(router);
    };

    const links = [
        {
            title: "Feed",
            href: "/dashboard",
            icon: (
                <IconBrandTabler className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        { 
            title: "Search", 
            href: "/search", 
            icon: <IconSearch className="text-white h-5 w-5 flex-shrink-0" /> 
        },
        {
            title: "Profile",
            href: userId ? `/profile/${userId}` : "#",
            icon: (
                <IconUserBolt className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            title: "Workouts",
            href: "#",
            icon: (
                <IconBarbell className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            title: "Nutrition",
            href: "#",
            icon: (
                <IconApple className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            title: "Messages",
            href: "#",
            icon: (
                <IconMessage className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            title: "Settings",
            href: "/settings",
            icon: (
                <IconSettings className="text-white h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            title: "Logout",
            href: "#",
            icon: <IconArrowLeft className="text-white h-5 w-5 flex-shrink-0" />,
            onClick: onLogoutClick,
        },
    ];
    
    return (
        <div className="fixed bottom-10 left-1/3 w-auto z-10">
            <FloatingDock
                mobileClassName="translate-y-20"
                items={links}
                backgroundColor="bg-gray-800" // Dark gray background
            />
        </div>
    );
};

export default Navbar;
