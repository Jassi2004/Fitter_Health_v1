"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconBoxAlignRightFilled,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge, gaugeClasses, GaugeContainer, GaugeReferenceArc, GaugeValueArc } from '@mui/x-charts/Gauge';
import { TextGenerateEffect } from "../ui/text-generate-effect";


export function DashboardBento() {
    const pageHeading = "Dashboard"
    return (





        <>
            <div className="flex w-full h-screen">

                <div className="w-[24rem] h-full ml-2">
                    <BentoGridItem
                        key={1}
                        title="Monthly Leader Board"
                        description={(
                            <span className="text-sm">
                                Compete with your Friends
                            </span>
                        )}
                        header={<SkeletonOneLeaderboard />}
                        className={cn("[&>p:text-lg] w-96 h-full")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </div>

                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 mt-4">
                    <TextGenerateEffect className=" text-8xl font-extrabold" words={pageHeading} />
                </div>


                <div className="w-auto min-h-[30rem] h-auto flex mx-2 my-60">

                    <BentoGridItem
                        key={1}
                        title="Workout Stats for Nerds"
                        description={(
                            <span className="text-sm">
                                Hover To See Your Stats.
                            </span>
                        )}
                        header={<SkeletonTwo />}
                        className={cn("[&>p:text-lg] h-auto w-[23rem] mx-1")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />

                    <BentoGridItem
                        key={1}
                        title="Achivements"
                        description={(
                            <span className="text-sm">
                                Your Achivements Matter
                            </span>
                        )}
                        header={<SkeletonFour />}
                        className={cn("[&>p:text-lg] h-[30rem] w-[23rem] mx-1")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </div>

                <div className="w-[25rem] h-full">
                    <BentoGridItem
                        key={1}
                        title="Current Weight"
                        description={(
                            <span className="text-sm">
                                Your Ideal Weight is {70} kg
                            </span>
                        )}
                        header={<SkeletonThree currWeight={89} idealWeight={70} />} // Correct way to pass props
                        className={cn("[&>p:text-lg] h-[27rem] w-96 my-2")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />

                    <BentoGridItem
                        key={1}
                        title="Workout Logs"
                        description={(
                            <span className="text-sm">
                                Your Past Workout
                            </span>
                        )}
                        header={<SkeletonOne />}
                        className={cn("[&>p:text-lg] h-[27rem] w-96")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </div>



                {/* <div className="flex my-36 ">

                    <BentoGridItem
                        key={1}
                        title="Workout Stats for Nerds"
                        description={(
                            <span className="text-sm">
                                Hover To See Your Stats.
                            </span>
                        )}
                        header={<SkeletonTwo />}
                        className={cn("[&>p:text-lg] h-[30rem] w-1/5 mx-10")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />

                    <BentoGridItem
                        key={1}
                        title="Achivements"
                        description={(
                            <span className="text-sm">
                                Your Achivements Matter
                            </span>
                        )}
                        header={<SkeletonFour />}
                        className={cn("[&>p:text-lg] h-[30rem] w-1/5 mx-10")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </div>

                <BentoGridItem
                    key={1}
                    title="Past Workout Record"
                    description={(
                        <span className="text-sm">
                            All Your Past Workouts
                        </span>
                    )}
                    header={<SkeletonOne />}
                    className={cn("[&>p:text-lg] w-1/3 h-full")}
                    icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                /> */}


            </div>


            {/* <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={cn("[&>p:text-lg]", item.className)}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid> */}
        </>
    );
}

const getRandomColor = () => {
    const gradients = [
        "from-pink-500 to-violet-500",
        "from-blue-500 to-green-500",
        "from-orange-500 to-red-500",
        "from-yellow-500 to-purple-500",
        "from-teal-500 to-indigo-500",
        "from-cyan-500 to-lime-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

const SkeletonOne = () => {
    // Step 1: Define Demo Data Array
    const demoData = [
        {
            "id": 1,
            "workoutName": "Leg Day",
            "date": "11/15/2024",
        },
        {
            "id": 2,
            "workoutName": "Cardio Blast",
            "date": "11/10/2024",
        },
        {
            "id": 3,
            "workoutName": "Squat Session",
            "date": "11/05/2024",
        },
        {
            "id": 4,
            "workoutName": "Glute Focus",
            "date": "11/12/2024",
        },
        {
            "id": 5,
            "workoutName": "HIIT Burn",
            "date": "11/18/2024",
        },
        {
            "id": 1,
            "workoutName": "Leg Day",
            "date": "11/15/2024",
        },
        {
            "id": 2,
            "workoutName": "Cardio Blast",
            "date": "11/10/2024",
        },
        {
            "id": 3,
            "workoutName": "Squat Session",
            "date": "11/05/2024",
        },
        {
            "id": 4,
            "workoutName": "Glute Focus",
            "date": "11/12/2024",
        },
        {
            "id": 5,
            "workoutName": "HIIT Burn",
            "date": "11/18/2024",
        },
    ]


    // Animation Variants
    const variants = {
        initial: { x: 0 },
        animate: { x: 10, rotate: 1.5, transition: { duration: 0.2 } },
    };
    const variantsSecond = {
        initial: { x: 0 },
        animate: { x: -10, rotate: -1.5, transition: { duration: 0.2 } },
    };

    // Step 2: Render Data Dynamically
    return (<>

        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full min-h-[12rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-4 overflow-y-auto max-h-[400px] custom-scrollbar"
        >

            {/* Map through demo data and apply alternating animation */}
            {demoData.map((item, index) => (
                <motion.div
                    key={item.id}
                    variants={index % 2 === 0 ? variants : variantsSecond} // Alternate Variants
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
                >
                    <div
                        className={`h-6 w-6 rounded-full bg-gradient-to-r ${getRandomColor()} flex-shrink-0`}
                    />
                    <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900">
                        {item.workoutName}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </>

    );
};


const SkeletonOneLeaderboard = () => {
    // Mixed-up Demo Data Array
    const demoData = [
        { id: 1, name: "Alice", caloriesBurned: 300, date: "11/18/2024" },
        { id: 2, name: "Bob", caloriesBurned: 100, date: "11/18/2024" },
        { id: 3, name: "Charlie", caloriesBurned: 500, date: "11/18/2024" },
        { id: 4, name: "Diana", caloriesBurned: 200, date: "11/18/2024" },
        { id: 5, name: "Ethan", caloriesBurned: 400, date: "11/18/2024" },
        { id: 6, name: "Alice", caloriesBurned: 320, date: "11/18/2024" },
        { id: 7, name: "Bob", caloriesBurned: 105, date: "11/18/2024" },
        { id: 8, name: "Charlie", caloriesBurned: 5000, date: "11/18/2024" },
        { id: 9, name: "Diana", caloriesBurned: 200, date: "11/18/2024" },
        { id: 10, name: "Ethan", caloriesBurned: 400, date: "11/18/2024" },
    ];

    // Sort the demo data by ascending caloriesBurned before rendering
    const sortedData = [...demoData].sort((a, b) => a.caloriesBurned - b.caloriesBurned);

    // Animation Variants
    const variants = {
        initial: { x: 0 },
        animate: { x: 10, rotate: 1.5, transition: { duration: 0.2 } },
    };
    const variantsSecond = {
        initial: { x: 0 },
        animate: { x: -10, rotate: -1.5, transition: { duration: 0.2 } },
    };

    const getCircleStyle = (rank) => {
        switch (rank) {
            case 1:
                return "bg-yellow-400 text-black border-yellow-500"; // Gold
            case 2:
                return "bg-gray-400 text-black border-gray-500"; // Silver
            case 3:
                return "bg-amber-700 text-white border-amber-800"; // Bronze
            default:
                return "bg-[#1976D2] text-white border-neutral-900"; // Default
        }
    };

    // Render Leaderboard
    return (
        <>
            <div className="flex justify-center">
                <button className="inline-flex h-12 w-36 animate-shimmer items-center justify-center rounded-md border border-yellow-500 bg-[linear-gradient(110deg,#f9d423,45%,#ffbc00,55%,#f9d423)] bg-[length:200%_100%] px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-100">
                    Leaderboard
                </button>
            </div>
            <motion.div
                initial="initial"
                whileHover="animate"
                className="flex flex-1 w-full min-h-[12rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-4 overflow-y-auto custom-scrollbar"
            >
                {/* Map through sorted data and apply alternating animation */}
                {sortedData.map((item, index) => {
                    const rank = index + 1; // Determine rank based on index
                    return (
                        <motion.div
                            key={item.id}
                            variants={index % 2 === 0 ? variants : variantsSecond}
                            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-4 items-center space-x-4 bg-white dark:bg-black"
                        >
                            <div
                                className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${getCircleStyle(
                                    rank
                                )}`}
                            >
                                {rank <= 3 ? rank : ""}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {item.name}
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Burned {item.caloriesBurned} calories
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </>
    );
};

const SkeletonTwo = () => {
    const workoutStats = [
        { id: 1, exercise: "Squats", duration: 45, calories: 250, date: "11/11/2024" },  // 45 minutes, 250 calories
        { id: 2, exercise: "Push-ups", duration: 30, calories: 150, date: "12/11/2024" }, // 30 minutes, 150 calories
        { id: 3, exercise: "Running", duration: 60, calories: 500, date: "11/15/2024" }, // 60 minutes, 500 calories
        { id: 4, exercise: "Cycling", duration: 40, calories: 350, date: "11/16/2024" }, // 40 minutes, 350 calories
        { id: 5, exercise: "Yoga", duration: 50, calories: 200, date: "11/17/2024" },   // 50 minutes, 200 calories
        { id: 6, exercise: "HIIT", duration: 25, calories: 300, date: "1/18/2024" },    // 25 minutes, 300 calories
    ];

    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };

    // Format the date to display only day and month (e.g., 11/11)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
        };
        return date.toLocaleDateString('en-GB', options);  // returns in "dd/mm" format
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
        >
            <div className="flex justify-center mb-7">
                <button className="inline-flex h-12 w-36 animate-shimmer items-center justify-center rounded-md border border-yellow-500 bg-[linear-gradient(110deg,#f9d423,45%,#ffbc00,55%,#f9d423)] bg-[length:200%_100%] px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-100">
                    Calories Burnt
                </button>
            </div>

            {workoutStats.map((item, i) => (
                <div key={item.id} className="flex items-center space-x-4 w-full">
                    {/* Display Date in the same line */}
                    <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-300">
                        {formatDate(item.date)}
                    </div>

                    {/* Motion Div for Skeleton Animation */}
                    <motion.div
                        key={"skelenton-two" + i}
                        variants={variants}
                        style={{
                            maxWidth: item.calories / 8 + "%",  // Set width based on calories
                        }}
                        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.6] p-4 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4 text-sm"
                    >
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {item.calories}
                        </div>
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
};













const SkeletonThree = ({ currWeight }) => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
            style={{
                background: "#030712",
                backgroundSize: "400% 400%",
            }}
        >
            <motion.div className="h-full w-full rounded-lg flex justify-center flex-col">
                <div className="flex justify-center">

                    <Gauge width={250} height={250} value={currWeight} startAngle={-90} endAngle={90} />
                </div>
                <div className="w-auto p-2 flex justify-center mb-10">
                    <button className="px-4 py-2 text-lg rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                        {currWeight} Kgs
                    </button>
                </div>
            </motion.div>

        </motion.div>
    );
};



const SkeletonFour = () => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
        >
            <div className="flex flex-col">

                <div className="flex my-5">

                    <motion.div
                        variants={first}
                        className="h-36 w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/assets/achivements/almond_mascot-removebg-preview.png"
                            alt="avatar"
                            height="200"
                            width="200"
                            className="rounded-full h-36 w-36"
                        />
                        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                            Athelete
                        </p>
                    </motion.div>
                    <motion.div
                        variants={second}
                        className="h-36 w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/assets/achivements/gym-bro.png"
                            alt="avatar"
                            height="200"
                            width="200"
                            className="rounded-full h-24 w-24"
                        />
                        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                            Gym Bro
                        </p>
                    </motion.div>
                </div>


                <div className="flex">

                    <motion.div
                        variants={first}
                        className="h-36 w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/assets/achivements/weight-badge.png"
                            alt="avatar"
                            height="200"
                            width="200"
                            className="rounded-full h-24 w-24"
                        />
                        <p className="border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 text-xs rounded-full px-2 py-0.5 mt-4">
                            Athelete
                        </p>
                    </motion.div>
                    <motion.div
                        variants={second}
                        className="h-36 w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/assets/achivements/consistent.png"
                            alt="avatar"
                            height="200"
                            width="200"
                            className="rounded-full h-24 w-24"
                        />
                        <p className="border border-blue-500 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs rounded-full px-2 py-0.5 mt-4">
                            Gym Bro
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* <motion.div
                variants={first}
                className="h-36 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src="/assets/achivements/almond_mascot-removebg-preview.png"
                    alt="avatar"
                    height="200"
                    width="200"
                    className="rounded-full h-24 w-24"
                />
                <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Athelete
                </p>
            </motion.div> */}
            {/* <motion.div className="h-36 relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <Image
                    src="/assets/achivements/sport-gym-logo-graphic-design.png"
                    alt="avatar"
                    height="200"
                    width="200"
                    className="rounded-full h-24 w-24"
                />
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Gym Bro
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <Image
                    src=""
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    I love angular, RSC, and Redux.
                </p>
                <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Helpless
                </p>
            </motion.div> */}
        </motion.div>
    );
};
const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
            >
                <Image
                    src=""
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="text-xs text-neutral-500">
                    There are a lot of cool framerworks out there like React, Angular,
                    Vue, Svelte that can make your life ....
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">Use PHP.</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
            </motion.div>
        </motion.div>
    );
};

// const items = [
//     {
//         title: "Past Workout Record",
//         // description: (
//         // <span className="text-sm">
//         //     Experience the power of AI in generating unique content.
//         // </span>
//         // ),
//         header: <SkeletonOne />,
//         className: "md:col-span-1",
//         icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//         title: "Automated Proofreading",
//         description: (
//             <span className="text-sm">
//                 Let AI handle the proofreading of your documents.
//             </span>
//         ),
//         header: <SkeletonTwo />,
//         className: "md:col-span-1",
//         icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//         title: "Contextual Suggestions",
//         description: (
//             <span className="text-sm">
//                 Get AI-powered suggestions based on your writing context.
//             </span>
//         ),
//         header: <SkeletonThree />,
//         className: "md:col-span-1",
//         icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//     },
//     {
//         title: "Sentiment Analysis",
//         description: (
//             <span className="text-sm">
//                 Understand the sentiment of your text with AI analysis.
//             </span>
//         ),
//         header: <SkeletonFour />,
//         className: "md:col-span-2",
//         icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//     },

//     {
//         title: "Text Summarization",
//         description: (
//             <span className="text-sm">
//                 Summarize your lengthy documents with AI technology.
//             </span>
//         ),
//         header: <SkeletonFive />,
//         className: "md:col-span-1",
//         icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//     },
// ];

