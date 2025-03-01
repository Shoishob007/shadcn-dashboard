/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { capitalizeText } from "./Capitalize";

export default function ApplicantsCard(props) {
  return (
    <div className="flex flex-wrap justify-between gap-3 bg-white dark:bg-gray-800">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-white dark:bg-gray-800 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.name}`}
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p className="dark:text-gray-200">{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400 dark:text-gray-200 text-xs">
          {props.position}
          </div>
        </div>
      </section>
      {/* <p className="dark:text-gray-200 text-xs">{props.position}</p> */}
      <p className="dark:text-gray-200 text-sm">{capitalizeText(props.status)}</p>
    </div>
  );
}
