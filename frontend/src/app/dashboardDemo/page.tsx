"use client"
import React from 'react';
import { DashboardBento } from '@/components/DashboardBento/dashboardBento';
import { Vortex } from "@/components/ui/vortex";



const Dashboard: React.FC = () => {
    return (

        <div className="w-full mx-auto rounded-md h-screen overflow-hidden">
            <Vortex
                backgroundColor="black"
                rangeY={800}
                particleCount={500}
                baseHue={120}
                className="flex items-center flex-col justify-center w-full h-full"
            >
                <DashboardBento />
            </Vortex>
        </div>
    )
};

export default Dashboard;
