"use client";

import { motion } from "framer-motion";

export const Skeleton = ({ className }: { className: string }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-zinc-800 rounded-lg ${className}`}
  />
);

export const ServiceCardSkeleton = () => (
  <div className="premium-card p-3 flex gap-4 items-center">
    <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-10 h-4" />
      </div>
      <Skeleton className="w-16 h-4" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center gap-2">
    <Skeleton className="w-14 h-14 rounded-2xl" />
    <Skeleton className="w-12 h-3" />
  </div>
);
