"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BentoGridItem } from "../ui/bento-grid";
import {
    IconClipboardCopy,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge } from '@mui/x-charts/Gauge';
import getLeaderboard from "@/services/dashboard/leaderboard";
import { SparklesCore } from "../ui/sparkles";
import getUserCalories from "@/services/dashboard/calories";


export function DashboardBento() {
    const [currUserId, setCurrUserId] = useState<string | "">();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        console.log(storedUserId);

        if (storedUserId) {
            setCurrUserId(storedUserId);
        } else {
            console.error("No userId found in local storage");
        }
    }, []);

    return (
        <>
            <div className="flex w-full h-screen">
                <div className="w-[24rem] h-full ml-2">
                    {currUserId ? (
                        <BentoGridItem
                            title="Monthly Leader Board"
                            description={(
                                <span className="text-sm">
                                    Compete with your Friends
                                </span>
                            )}
                            header={<SkeletonOneLeaderboard userId={currUserId} />}
                            className={cn("[&>p:text-lg] w-96 h-full")}
                            icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                        />
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>


                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -mt-36 h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
                    <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative -z-20">
                        Aceternity
                    </h1>
                    <div className="w-[40rem] h-40 relative">
                        {/* Gradients */}
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                        {/* Core component */}
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-[2rem]"
                            particleColor="#FFFFFF"
                        />

                        {/* Radial Gradient to prevent sharp edges */}
                        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>
                </div>


                <div className="w-auto min-h-[30rem] h-auto flex mx-2 my-60">

                    <BentoGridItem
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
                        title="Achivements"
                        description={(
                            <span className="text-sm">
                                Your Amazing
                            </span>
                        )}
                        header={<SkeletonFour />}
                        className={cn("[&>p:text-lg] h-[30rem] w-[23rem] mx-1")}
                        icon={<IconClipboardCopy className="h-4 w-4 text-neutral-500" />}
                    />
                </div>

                <div className="w-[25rem] h-full">
                    <BentoGridItem
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
            </div>
        </>
    );
}

const SkeletonOneLeaderboard = ({ userId }: { userId: string }) => {
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                const response = await getLeaderboard(userId);
                setLeaderboardData(response.leaderboard); // Use the API response structure
                setError(null);
            } catch (err: any) {
                console.error("Error fetching leaderboard:", err.message);
                setError("Failed to load leaderboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [userId]);

    // Animation Variants
    const variants = {
        initial: { x: 0 },
        animate: { x: 10, rotate: 1.5, transition: { duration: 0.2 } },
    };
    const variantsSecond = {
        initial: { x: 0 },
        animate: { x: -10, rotate: -1.5, transition: { duration: 0.2 } },
    };

    const getCircleStyle = (rank: number) => {
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

    // Render
    if (loading) {
        return <p>Loading leaderboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="flex justify-center">
                <button className=" font-extrabold inline-flex h-12 w-36 animate-shimmer items-center justify-center rounded-md border border-yellow-500 bg-[linear-gradient(110deg,#f9d423,45%,#ffbc00,55%,#f9d423)] bg-[length:200%_100%] px-2 text-black transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-100">
                    Leaderboard
                </button>
            </div>
            <motion.div
                initial="initial"
                whileHover="animate"
                className=" pt-5 flex flex-1 w-full min-h-[12rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-4 overflow-y-auto custom-scrollbar"
            >
                {/* Map through sorted data and apply alternating animation */}
                {leaderboardData.map((item, index) => {
                    const rank = index + 1; // Determine rank based on index
                    return (
                        <motion.div
                            key={item.followerId}
                            variants={index % 2 === 0 ? variants : variantsSecond}
                            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-4 bg-white dark:bg-black"
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
                                    {item.username}
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Burned {item.totalCalories} calories
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </>
    );
};


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



const SkeletonTwo = () => {
    const [workoutStats, setWorkoutStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const variants = {
        initial: { width: 0 },
        animate: { width: "100%", transition: { duration: 0.2 } },
        hover: { width: ["0%", "100%"], transition: { duration: 2 } },
    };

    // Format the date to display only day and month (e.g., 11/11)
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const options = { day: "2-digit", month: "2-digit" };
        return date.toLocaleDateString("en-GB", options); // Returns in "dd/mm" format
    };

    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    throw new Error("userId not found. Please log in again.");
                }

                const data = await getUserCalories(userId);

                setWorkoutStats(data.data || []); // Assuming API returns { data: [...] }
            } catch (err) {
                console.error("Failed to fetch workout stats:", err);
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchCalories();
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4"
        >
            <div className="flex justify-center mb-7">
                <button className="inline-flex font-extrabold h-12 w-auto animate-shimmer items-center justify-center rounded-md border border-yellow-500 bg-[linear-gradient(110deg,#f9d423,45%,#ffbc00,55%,#f9d423)] bg-[length:200%_100%] px-3 text-black transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-100">
                    Calories Burnt
                </button>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : workoutStats.length > 0 ? (
                workoutStats.map((item, i) => (
                    <div key={item._id} className="flex items-center space-x-4 w-full">
                        {/* Display Date in the same line */}
                        <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-300">
                            {formatDate(item.date)}
                        </div>

                        {/* Motion Div for Skeleton Animation */}
                        <motion.div
                            key={"skeleton-two" + i}
                            variants={variants}
                            style={{
                                maxWidth: item.calories / 8 + "%",
                            }}
                            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.6] p-4 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4 text-sm"
                        >
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                {item.calories}
                            </div>
                        </motion.div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No workout data available.</div>
            )}
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

                <div className="flex my-5 space-x-8 pl-4">

                    <motion.div
                        variants={first}
                        className="h-36 w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
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


                <div className="flex space-x-8 pl-4">

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

