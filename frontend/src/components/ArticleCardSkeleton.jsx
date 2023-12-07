import React from 'react'

function ArticleCardSkeleton({ className }) {
  return (
    <div
      className={`rounded-xl overflow-hidden 
      shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${className} animate-pulse`}
    >
      <div className="w-full aspect-video bg-slate-300" />
      <div className="p-5">
        <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />

        <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg:slate-300" />

            <div className="flex flex-col">
              <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />

              <div className="flex items-center gap-x-2">
                <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCardSkeleton