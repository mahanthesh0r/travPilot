"use client";
import React, {useState} from "react";
import { TypewriterEffectSmooth } from "../app/components/ui/typerwriter-effect";
import { WavyBackground } from "../app/components/ui/wave-background";
import { MultiStepLoader as Loader } from "../app/components/ui/multi-step-loader";
import {Input} from '../app/components/ui/input';
import {Label} from '../app/components/ui/label';
import Datepicker from "react-tailwindcss-datepicker"; 
import Link from 'next/link'
import { useRouter } from 'next/navigation';


import { IconSquareRoundedX } from "@tabler/icons-react";


interface DateValue {
  startDate: Date;
  endDate: number; // since setMonth returns a number
}

let initialValues = {
  fromCity: '',
  toCity: '',
  budget: ''
}



export default function SparklesPreview() {
  const [value, setValue] = useState<DateValue>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });


  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [inputs, setInputs] = useState(initialValues)

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


  const loadingStates = [
    {
      text: "Looking for best flights",
    },
    {
      text: "Looking for Affordable Hotels",
    },
    {
      text: "Looking for Best Restaurants",
    },
    {
      text: "Planning your Itenary",
    },
    {
      text: "Almost Done!",
    },
    {
      text: "Happy Travelling!!",
    },
  ];


  const handleClick = () => {
   // sendData()
    window.location.href ="/itenary"
    //router.push('/itenary');
  };

  const onChangeInput = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
    console.log(inputs)
  };


  const handleValueChange = (newValue: DateValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    console.log(newValue.startDate)
  };

  const getData = async () => {
    fetch("http://127.0.0.1:8000/sendMessage?budget=" + inputs.budget + "&from_city=" + inputs.fromCity + "&to_city=" + inputs.toCity + "&start_date=" + value.startDate + "&end_date=" + value.endDate)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.status
      })
  };




  return (
    <main className="w-screen h-screen relative flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} loop={false}/>
    <section className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center space-y-5">
      <WavyBackground className="max-w-4xl mx-auto">
        <TypewriterEffectSmooth words={words} />
      </WavyBackground>
      <div className=" relative w-screen px-20 pb-[5rem] grid grid-cols-2 gap-3">
        <div>
        <Label htmlFor="from">From</Label>
            <Input name="fromCity" id="fromCity" value={ inputs.fromCity || "" } onChange={ onChangeInput } placeholder="Country, City" type="text" />
        </div>
        <div>
        <Label htmlFor="to">To</Label>
            <Input name="toCity" id="toCity" value={ inputs.toCity || "" }  onChange={ onChangeInput } placeholder="Country, City" type="text" />
        </div>
        <div>
        <Label htmlFor="budget">Budget</Label>
            <Input name="budget" id="budget" value={ inputs.budget || "" } onChange={ onChangeInput } placeholder="$2000" type="number" />
        </div>
        <div className="">
          <h1>Date</h1>
        <Datepicker
      value={value}
      onChange={handleValueChange}
      displayFormat={"DD/MM/YYYY"} 
      startFrom={"04/04/2024"}
      
    />
        </div>
      </div>

      <Link href="">
      <button className="p-[3px] relative flex items-center justify-center" onClick={handleClick}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          Start My Trip
        </div>
      </button>
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
      </Link>

    </section>
  </main>
  
  );
}
