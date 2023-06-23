import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <section className="w-full bg-black text-white flex justify-around">
      <div className="w-[70%] pt-[5rem] pb-[1rem] space-y-[2rem]">
        <p className="text-[1.8rem]">Teman</p>
        <div className="flex justify-between text-[.8rem]">
          <div>
            <p>Copyright © 2023</p>
          </div>
          <div>
            <p>
              Powered by{" "}
              <Link
                href="https://openai.com/"
                target="_blank"
                className="hover:border-b-[1px]"
              >
                OpenAi
              </Link>
            </p>
          </div>
          <div>
            <p>
              Website by{" "}
              <Link
                href="https://portfolio-neon-three-38.vercel.app/"
                target="_blank"
                className="hover:border-b-[1px] transition-all ease-in duration-200"
              >
                Guntek
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
