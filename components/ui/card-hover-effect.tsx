"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface ItemType {
  index: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HoverEffectPropsBase {
  items: ItemType[];
  className?: string;
}

interface HoverEffectPropsSingle extends HoverEffectPropsBase {
  multiple?: false;
  onSelectionChange?: (selectedIndex: number | null) => void;
}

interface HoverEffectPropsMultiple extends HoverEffectPropsBase {
  multiple: true;
  onSelectionChange?: (selectedIndices: number[]) => void;
}
type HoverEffectProps = HoverEffectPropsSingle | HoverEffectPropsMultiple;

export const HoverEffect = ({
  items,
  className,
  onSelectionChange,
  multiple,
}: HoverEffectProps) => {
  if (multiple) {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
      let newSelectedIndices;
      if (selectedIndices.includes(index)) {
        newSelectedIndices = selectedIndices.filter((i) => i !== index);
      } else {
        newSelectedIndices = multiple ? [...selectedIndices, index] : [index];
      }
      setSelectedIndices(newSelectedIndices);
      if (onSelectionChange) {
        onSelectionChange(newSelectedIndices);
      }
    };
    // console.log(selectedIndex);

    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4  py-10",
          className
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item.index}
            className="relative group  block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(idx)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId={`hoverBackground-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              className={cn(
                selectedIndices.includes(idx)
                  ? " bg-1 dark:bg-1 dark:text-white text-white"
                  : "bg-slate-100 dark:bg-black",
                "transition-colors duration-200"
              )}
            >
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        ))}
      </div>
    );
  } else {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
      const newIndex = selectedIndex === index ? null : index;
      setSelectedIndex(newIndex);
      if (onSelectionChange) {
        onSelectionChange(newIndex);
      }
    };

    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4  py-10",
          className
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item.index}
            className="relative group  block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(idx)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId={`hoverBackground-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              className={cn(
                selectedIndex === idx
                  ? " bg-1 dark:bg-1 dark:text-white text-white"
                  : "bg-slate-100 dark:bg-black",
                "transition-colors duration-200"
              )}
            >
              <CardTitle>
                {item.icon} {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        ))}
      </div>
    );
  }
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-1 overflow-hidden bg-slate-100 dark:bg-black border border-transparent dark:border-white/[0.2] dark:group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "dark:text-zinc-100 font-bold tracking-wide flex gap-2",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        " dark:text-zinc-200 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
