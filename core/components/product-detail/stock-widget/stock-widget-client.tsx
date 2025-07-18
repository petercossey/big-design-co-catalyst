'use client';

import { ReactNode } from 'react';

interface StockWidgetClientProps {
  children: ReactNode;
}

export function StockWidgetClient({ children }: StockWidgetClientProps) {
  // This component can be enhanced with client-side features like:
  // - Real-time stock updates
  // - Refresh functionality
  // - Error boundaries

  return children;
}

export function StockWidgetSkeleton() {
  return (
    <div className="mb-5 animate-pulse">
      <div className="mb-4 flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
        <div className="h-3 w-3 rounded-full bg-gray-300" />
        <div className="flex flex-1 items-center justify-between">
          <div className="h-5 w-20 rounded bg-gray-300" />
          <div className="h-5 w-16 rounded bg-gray-300" />
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-3 h-5 w-32 rounded bg-gray-300" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}