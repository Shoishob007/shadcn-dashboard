import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { List, Grid2x2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const GridListTooltip = ({isListView, setViewMode}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-0 bg-transparent hover:bg-transparent"
            >
              <motion.button
                onClick={() => setViewMode("card")}
                className={`p-1 sm:p-2 duration-300 ${
                  !isListView
                    ? "bg-gray-900 text-white dark:bg-gray-300 dark:text-gray-800"
                    : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid2x2 className="h-3 sm:h-6 w-3 sm:w-6" />
              </motion.button>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Card View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-0 bg-transparent hover:bg-transparent"
            >
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-1 sm:p-2 duration-300 ${
                  isListView
                    ? "bg-gray-900 text-white dark:bg-gray-300 dark:text-gray-800"
                    : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="h-3 sm:h-6 w-3 sm:w-6" />
              </motion.button>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default GridListTooltip;
