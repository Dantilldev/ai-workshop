import React from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul
            className={`${poppins.className} flex justify-center flex-wrap  p-4 mb-6 font-semibold text-black `}
          >
            <Link className="hover:rounded hover:bg-slate-300 p-2 " href={"/"}>
              Home
            </Link>
            <Link
              className="hover:rounded hover:bg-slate-300 p-2 "
              href={"/chatbot"}
            >
              Chatbot
            </Link>
            <Link
              className="hover:rounded hover:bg-slate-300 p-2 "
              href={"/translator"}
            >
              Translator
            </Link>
            <Link
              className="hover:rounded hover:bg-slate-300 p-2 "
              href={"/aiquiz"}
            >
              Quiz
            </Link>
            <Link
              className="hover:rounded hover:bg-slate-300 p-2 "
              href={"/ai-travel"}
            >
              Travels
            </Link>
            <Link className="hover:rounded hover:bg-slate-300 p-2 " href={"/"}>
              Justus
            </Link>
            <Link className="hover:rounded hover:bg-slate-300 p-2 " href={"/"}>
              Sumiyabazar
            </Link>
          </ul>
        </nav>
      </header>
      {children}
      <footer className=" flex justify-center items-end text-white p-4">
        <small>© 2025 All rights reserved.</small>
      </footer>
    </>
  );
}
