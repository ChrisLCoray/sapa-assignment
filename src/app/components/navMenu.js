"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function NavMenu(props) {
    const menuLinks = props.menuLinks
    const [menuOpen, setMenuOpen] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const useWindowSize = () => {
        useEffect(() => {

            const handleResize = () => {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }

            window.addEventListener("resize", handleResize)
            handleResize()

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize)
        }, []) // Empty array ensures that effect is only run on mount
        return windowSize
    }

    useWindowSize()

    return (
        <div className="sm:w-[80%] mb-auto">
            <div className="bg-(--color-green1) w-8 h-8 rounded-md absolute top-2 left-2 sm:hidden" onClick={toggleMenu}>
                {menuOpen ? <Image src="/close.svg" alt="Menu Icon" width={32} height={32} /> : <Image src="/menu.svg" alt="Menu Icon" width={32} height={32} />}
            </div>
            <nav className={`${(windowSize.width < '641') ? menuOpen ? `absolute top-9 left-2 flex` : `hidden -top-999 -left-999` : ``} w-[80%] rounded-md sm:rounded-none sm:relative flex-col justify-between sm:flex bg-(--color-green1) sm:bg-[transparent] p-4 sm:bg-(transparent) sm:p-0 sm:flex-row gap-4 font-montserrat text-s sm:text-xs font-semibold sm:w-[100%] z-50 sm:z-auto`}>
                {menuLinks.map((mLink, i) => (
                    <Link key={`nav-${i}`} className="hover:border-b-1 text-(--color-grey3) sm:text-(--color-green1) text-center pt-2" href={mLink.href}>{mLink.text}</Link>
                ))}
            </nav>
        </div>
    )
}
