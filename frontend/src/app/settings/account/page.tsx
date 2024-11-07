"use client"
import React from 'react'
import MySidebar from '@/components/sidebar/MySidebar'
import AccountSettings from './../../../components/settings/accountSettings'

const account = () => {
  return (
    <>
    <div className="flex ">
    <MySidebar/>
    <AccountSettings/>
    </div>
    
    
    </>
    
  )
}

export default account