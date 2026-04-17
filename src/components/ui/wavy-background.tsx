"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  waveYOffset = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  waveYOffset?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const ntRef = useRef(0);
  const animationIdRef = useRef<number>(0);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number) => {
    ntRef.current += getSpeed();
    const ctx = ctxRef.current;
    const { w, h } = dimensionsRef.current;
    if (!ctx) return;

    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
        // Use waveYOffset as a multiplier for height (0.5 is center)
        // If it's a large value like 250, we treat it as pixels
        const yBase = waveYOffset > 1 ? waveYOffset : h * waveYOffset;
        ctx.lineTo(x, y + yBase);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  const render = () => {
    const ctx = ctxRef.current;
    const { w, h } = dimensionsRef.current;
    if (!ctx) return;

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      dimensionsRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
      ctx.filter = `blur(${blur}px)`;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(container);
    handleResize();
    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [blur, backgroundFill, waveOpacity, waveWidth, speed, waveYOffset]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
