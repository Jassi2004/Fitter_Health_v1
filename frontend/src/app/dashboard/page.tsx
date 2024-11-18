"use client"
import React from 'react';
import { DashboardBento } from '@/components/DashboardBento/dashboardBento';

const Dashboard: React.FC = () => {
  return (

    <div className="w-full mx-auto rounded-md h-screen overflow-hidden">
      <DashboardBento />
    </div>
  )
};

export default Dashboard;
