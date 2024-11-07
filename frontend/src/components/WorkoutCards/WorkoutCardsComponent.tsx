"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";

// Array of workout card data
const workoutCards = [
    {
        title: "Full Body Workout",
        description: "A mix of strength and cardio exercises for a complete workout.",
        duration: "45 mins",
        gradient: "from-green-400 via-green-500 to-green-600",
        href: "/workouts/full-body",
    },
    {
        title: "Upper Body Strength",
        description: "Focus on arms, chest, and back for upper body development.",
        duration: "30 mins",
        gradient: "from-blue-500 via-blue-600 to-indigo-600",
        href: "/workouts/upper-body",
    },
    {
        title: "Core & Abs",
        description: "Target your core with exercises designed to strengthen and tone.",
        duration: "25 mins",
        gradient: "from-yellow-400 via-orange-500 to-red-500",
        href: "/workouts/core",
    },
    {
        title: "Leg Day",
        description: "Build leg strength with targeted exercises for lower body power.",
        duration: "40 mins",
        gradient: "from-purple-400 via-purple-500 to-pink-500",
        href: "/workouts/legs",
    },
    {
        title: "Cardio Blast",
        description: "High-energy cardio to boost endurance and burn calories.",
        duration: "30 mins",
        gradient: "from-red-400 via-red-500 to-orange-500",
        href: "/workouts/cardio",
    },
    {
        title: "Yoga & Flexibility",
        description: "Gentle yoga sequences to enhance flexibility and relaxation.",
        duration: "60 mins",
        gradient: "from-teal-400 via-teal-500 to-blue-500",
        href: "/workouts/yoga",
    },
    {
        title: "HIIT (High Intensity Interval Training)",
        description: "Short bursts of high-intensity exercises to maximize results.",
        duration: "20 mins",
        gradient: "from-red-600 via-pink-600 to-purple-600",
        href: "/workouts/hiit",
    },
    {
        title: "Lower Body Strength",
        description: "Exercises focusing on glutes and thighs for lower body strength.",
        duration: "35 mins",
        gradient: "from-indigo-500 via-blue-700 to-blue-900",
        href: "/workouts/lower-body",
    },
];

export function WorkoutCardComponent() {
    return (
        <div className="flex overflow-x-auto scrollbar-hide p-6 space-x-6 ">
            {workoutCards.map((card, index) => (
                <PinContainer duration={card.duration} key={index} title={card.title} href={card.href}>
                    <div className="flex basis-full flex-col  p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] rounded-lg">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                            {card.title}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500">
                                {card.description}
                            </span>
                        </div>
                        <div className={`flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br ${card.gradient}`}>
                            <span className="text-black font-bold text-3xl m-16">
                                {card.duration}
                            </span>
                        </div>
                    </div>
                </PinContainer>
            ))}
        </div>
    );
}

export default WorkoutCardComponent;
