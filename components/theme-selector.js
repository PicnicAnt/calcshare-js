'use client'

import { useEffect } from "react"

export default function ThemeSelector() {
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
    }, [])

    function changeTheme() {
        if (localStorage.theme === 'light') {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
        else {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <button onClick={changeTheme}>Toggle theme</button>
    )
}
