"use client";
import React, {useState} from "react";
import { TypewriterEffectSmooth } from "../app/components/ui/typerwriter-effect";
import { WavyBackground } from "../app/components/ui/wave-background";
import {Input} from '../app/components/ui/input';
import {Label} from '../app/components/ui/label';
import Datepicker from "react-tailwindcss-datepicker"; 
import Link from 'next/link'



interface DateValue {
  startDate: Date;
  endDate: number; // since setMonth returns a number
}

export default function SparklesPreview() {
  const [value, setValue] = useState<DateValue>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue: DateValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  const words = [
    {
      text: "Find",
      className:
        "md:text-4xl text-4xl lg:text-5xl font-bold text-center text-white relative z-20",
    },
    {
      text: "Bind",
      className:
        "md:text-4xl text-4xl lg:text-5xl font-bold text-center text-white relative z-20",
    },
    {
      text: "Unwind",
      className:
        "md:text-4xl text-4xl lg:text-5xl font-bold text-center text-white relative z-20",
    },
    {
      text: "with",
      className:
        "md:text-4xl text-4xl lg:text-5xl font-bold text-center text-white relative z-20",
    },
    {
      text: "TravPilot.",
      className:
        "md:text-4xl text-4xl lg:text-6xl font-bold text-center text-orange-500 dark:text-orange-500 relative z-20",
    },
  ];



  



  return (
    <main className="w-screen h-screen relative flex items-center justify-center">
    <section className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center space-y-5">
      <WavyBackground className="max-w-4xl mx-auto">
        <TypewriterEffectSmooth words={words} />
      </WavyBackground>
      <div className=" relative w-screen px-20 pb-[5rem] grid grid-cols-2 gap-3">
        <div>
        <Label htmlFor="firstname">From</Label>
            <Input id="firstname" placeholder="Country, City" type="text" />
        </div>
        <div>
        <Label htmlFor="firstname">To</Label>
            <Input id="firstname" placeholder="Country, City" type="text" />
        </div>
        <div>
        <Label htmlFor="firstname">Budget</Label>
            <Input id="firstname" placeholder="$2000" type="number" />
        </div>
        <div className="">
          <h1>Date</h1>
        <Datepicker
      value={value}
      onChange={handleValueChange}
    />
        </div>
      </div>

      <Link href="/itenary">
      <button className="p-[3px] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          Start My Trip
        </div>
      </button>
      </Link>

    </section>
  </main>
  
  );
}
