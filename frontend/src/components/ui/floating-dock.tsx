import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
    backgroundColor = "bg-gray-800", // Default dark gray background
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    desktopClassName?: string;
    mobileClassName?: string;
    backgroundColor?: string; // Accept background color as prop
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} backgroundColor={backgroundColor} />
            <FloatingDockMobile items={items} className={mobileClassName} backgroundColor={backgroundColor} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
    backgroundColor,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
    backgroundColor?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className={`absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 ${backgroundColor}`}
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={item.onClick}
                                    className={`h-10 w-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center transition-transform duration-200 hover:bg-gray-600`}
                                >
                                    <div className="h-4 w-4">{item.icon}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className={`h-10 w-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center transition-transform duration-200 hover:bg-gray-600`}
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-white" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
    backgroundColor,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
    backgroundColor?: string;
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                `mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl ${backgroundColor} px-4 pb-3`,
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    onClick,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href} onClick={onClick}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center relative transition-transform duration-200 hover:bg-gray-600"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute text-xs top-full left-1/2 transform -translate-x-1/2 bg-gray-600 text-white p-1 rounded shadow-lg"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div style={{ width: widthIcon, height: heightIcon }}>
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}
