'use client'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function HomeNote() {
    const router = useRouter();

    useEffect(() => {
        router.push('/note')
    }, [])

    return (
        <div>HomeNote</div>
    )
}
