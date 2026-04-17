"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type React from "react"

interface LayeredTextProps {
  items?: string[]
  onItemHover?: (item: string | null) => void
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  items = [],
  onItemHover,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const itemsList = container.querySelectorAll("li")

    const triggers: ScrollTrigger[] = []

    itemsList.forEach((li) => {
      const p = li.querySelector("p")
      if (!p) return
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: li,
          start: "top 65%", // light up when entering middle
          end: "top 35%",   // dim when exiting
          scrub: 1.5,       // smooth trailing effect
        }
      })

      // We animate standard webkit values and colors
      // Transparent to active accent color
      tl.to(p, {
        color: "rgba(0, 217, 255, 1)", // solid vs-accent
        webkitTextStrokeColor: "rgba(0, 217, 255, 1)",
        textShadow: "0 0 25px rgba(0, 217, 255, 0.5)",
        x: 30, // Push out slightly as you step on it
        duration: 1,
        ease: "sine.inOut"
      }).to(p, {
        color: "rgba(0, 217, 255, 0)", // back to transparent
        webkitTextStrokeColor: "rgba(255, 255, 255, 0.15)", // back to default stroke
        textShadow: "0 0 0px rgba(0, 217, 255, 0)",
        x: 0,
        duration: 1,
        ease: "sine.inOut"
      })

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger)
      }
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-[1400px] mx-auto font-headline font-black uppercase antialiased py-32 overflow-hidden ${className}`}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-start w-full px-4 md:px-12 space-y-2 md:space-y-4">
        {items.map((item, index) => {
          // Creates an elegant wrapping staircase wave (0, 1, 2, 3, 2, 1, 0)
          const cycle = index % 8
          const stepMultiplier = cycle <= 4 ? cycle : 8 - cycle
          
          return (
            <li
              key={index}
              onMouseEnter={() => onItemHover?.(item)}
              onMouseLeave={() => onItemHover?.(null)}
              className="relative cursor-pointer group"
              style={{
                marginLeft: `calc(${stepMultiplier * 4}vw + 2%)`,
              }}
            >
              <p
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] leading-[1.1] m-0 transition-colors duration-300 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:!text-white group-hover:[-webkit-text-stroke:1px_white] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                style={{
                  color: "rgba(0, 217, 255, 0)",
                  WebkitTextStrokeColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                {item}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
