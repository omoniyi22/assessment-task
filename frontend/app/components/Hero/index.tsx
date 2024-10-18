import React, { useState } from 'react'
import Wallet from './Wallet';
import Join from './Join';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/state/store';

export default function Hero() {

    const { token, profile } = useSelector((state: RootState) => state.user || {});

    return (
        <>
            {!token ? <Join /> : <Wallet />}
        </>
    )
}
