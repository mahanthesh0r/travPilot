"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../components/ui/tracing-beam";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "../components/ui/gemini-effect";
import dummyJson from '../../data/dummy.json'

// const World = dynamic(() => import("../../app/components/ui/globe").then((m) => m.World), {
//   ssr: false,
// });

interface DayActivity {
  name: string;
  address: string;
  URL: string;
}

interface Day {
  breakfast: DayActivity;
  entertainment1: DayActivity;
  lunch: DayActivity;
  entertainment2: DayActivity;
  dinner: DayActivity;
  entertainment3: DayActivity;
}

interface Itinerary {
  flight: {
    flightUrl: string;
    flightPrice: number;
    flightArrivalTime: string;
  };
  hotel: {
    hotelAddress: string;
    hotelName: string;
    hotelURL: string;
  };
  days: Day[];
}

export default function Itenary() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  
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

  const [loading, setLoading] = useState(false);
  const [itenary, setItenary] = useState<Itinerary | null>(null);

//   const getData = async () => {
//     fetch("http://127.0.0.1:8000/sendMessage")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data != "") setItenary(data);
//       })
//       .catch((error) => console.log(error));
//     setLoading(false);
//   };

const getData = async () => {
    fetch("http://127.0.0.1:8000/getMessage")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data != "") setItenary(data);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const getDataFromFile = () => {
    // fetch("../../data/dummy.json")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data != "") setItenary(data);
    //   })
    //   .catch((error) => console.log(error));

    setItenary(dummyJson)
    console.log(dummyJson)
  };
  


  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
        //getData();
        //getDataFromFile
        setItenary(dummyJson)
        //console.log(itenary)
        setLoading(false);
      }, 12000);
      return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (itenary != null) {
      setLoading(false);
      console.log(loading);
      console.log(itenary);
    }
  }, [itenary]);

  

  if (!itenary) {
    return (
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
        loop={true}
      />
    );
  }

  return (
    <div className="grid grid-flow-row">
      <div
        className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      {/* <div className="mt-20 max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            Travel Smart with TravPilot
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            Itenary tailored just for you!
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />;
        </div>
      </div> */}

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <h1 className="p-5 text-4xl font-black text-gray-900 dark:text-white">
            Flight Information
          </h1>
          <p className="text-xl font-medium text-gray-900 dark:text-white">
            {" "}
            <strong>Price: </strong>
          </p>
          <p className="text-xl text-gray-900 font-extralight dark:text-green-500">
            ${itenary.flight.flightPrice}
          </p>

          <p className="pt-5 text-xl font-medium text-gray-900 dark:text-white">
            {" "}
            <strong>flightArrivalTim: </strong>
          </p>
          <p className="pb-5 text-xl text-gray-900 font-extralight dark:text-white">
            {itenary.flight.flightArrivalTime}
          </p>

          <a
            href={itenary.flight.flightUrl}
            target="_blank"
            className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Book Flight
          </a>

          <h1 className="p-5 text-4xl font-black text-gray-900 dark:text-white">
            Hotel Information
          </h1>

          <p className="text-xl font-medium text-gray-900 dark:text-white">
            {" "}
            <strong>Name: </strong>
          </p>
          <p className="text-xl text-gray-900 font-extralight dark:text-white ">
            {itenary.hotel.hotelName}
          </p>

          <p className="pt-5 text-xl font-medium text-gray-900 dark:text-white">
            {" "}
            <strong>Address: </strong>
          </p>
          <p className="pb-5 text-xl text-gray-900 font-extralight dark:text-white">
            {itenary.hotel.hotelAddress}
          </p>

          <a
            href={itenary.hotel.hotelURL}
            target="_blank"
            className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Book Hotel
          </a>

          <h1 className="pt-5 text-4xl font-black text-gray-900 dark:text-white">
            Daily Itenary
          </h1>
          {itenary.days.map((day, index) => (
            <div key={index}>
              <h3 className="pt-10 pb-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                <strong>Day {index + 1}</strong>
              </h3>
              <div>
                <p className="text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Breakfast: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.breakfast.URL} target="_blank">{day.breakfast.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.breakfast.address}
                </p>

              </div>
              <div>
              <p className="pt-2 text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Entertainment: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.entertainment1.URL} target="_blank">{day.entertainment1.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.entertainment1.address}
                </p>

                </div>

                <div>
                <p className="pt-2 text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Lunch: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.lunch.URL} target="_blank">{day.lunch.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.lunch.address}
                </p>
              </div>

              <div>
                <p className="pt-2 text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Entertainment: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.entertainment2.URL} target="_blank">{day.entertainment2.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.entertainment2.address}
                </p>
              </div>


              <div>
                <p className="pt-2 text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Dinner: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.dinner.URL} target="_blank">{day.dinner.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.dinner.address}
                </p>
              </div>

              <div>
                <p className="pt-5 text-xl font-medium text-gray-900 dark:text-white">
                  {" "}
                  <strong>Entertainment: </strong>
                </p>
                <p className="text-xl font-extralight text-blue-600 underline dark:text-blue-500 hover:no-underline">
                 <a href={day.entertainment3.URL} target="_blank">{day.entertainment3.name}</a> 
                </p>
                <p className="pb-5 text-sm text-gray-900 font-extralight dark:text-white">
                  {day.entertainment3.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
