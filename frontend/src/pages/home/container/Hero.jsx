import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

import { images } from '../../../constants';

function Hero() {

  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          feugiat purus. Nulla in pulvinar quam. Nunc lectus mauris, dictum a
          metus ut, dictum eleifend sapien.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:py-4"
              type="text"
              placeholder="Search article"
            />
          </div>
          <button className="w-full bg-orange-400 text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
            Search
          </button>
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-orange-400 bg-opacity-10 px-3 py-1.5 text-orange-400 font-semibold">
              Design
            </li>
            <li className="rounded-lg bg-orange-400 bg-opacity-10 px-3 py-1.5 text-orange-400 font-semibold">
              User Experience
            </li>
            <li className="rounded-lg bg-orange-400 bg-opacity-10 px-3 py-1.5 text-orange-400 font-semibold">
              User Interfaces
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img
          className="w-full h-auto max-w-[100%] lg:max-w-[540px]"
          src={images.title}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
}

export default Hero