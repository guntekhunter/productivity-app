"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
export default function Switcher() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeTheme = () => {
    setActive(!active);
    if (active) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="py-2 fixed top-[4rem] flex justify-around px-4 z-0 w-[.1rem] left-0 z-10 sm:w-[8rem]">
      <div className="w-[80%] py-[2rem] z-0">
        <div className="justify-between flex pl-[100%]">
          <div className="flex items-center">
            <label htmlFor="darkModeToggle">
              <div className="relative">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  className="sr-only"
                  onChange={changeTheme}
                />
                <div className="block bg-[#363636] shadow-md w-[4rem] h-[2rem] rounded-full"></div>
                <div
                  className={`dot absolute ${
                    active ? "left-1" : "right-1"
                  }  top-1 bg-white w-[1.5rem] h-[1.5rem] rounded-full transition duration-300 flex justify-around items-center`}
                >
                  {active ? (
                    <Image
                      alt="turtles"
                      src="/night-mode.png"
                      width={500}
                      height={200}
                      className="w-[1rem] object-cover "
                    />
                  ) : (
                    <Image
                      alt="turtles"
                      src="/sun.png"
                      width={500}
                      height={200}
                      className="w-[1rem] object-cover "
                    />
                  )}
                </div>
              </div>
            </label>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
