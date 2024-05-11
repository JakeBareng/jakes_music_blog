import Visualizer from "@/components/visualizer/visualizer";
import { useState } from "react";

export default function Index() {
  // fetch data from an API
  const [play, setPlay] = useState(false);
  return (
    <>
      {
        play ? <Visualizer /> : <EnterBtn setPlay={setPlay}/>
      }
    </>
  )
}

function EnterBtn({ setPlay }: any) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button onClick={() => setPlay(true)} className=" bg-black hover:bg-slate-200 hover:text-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Enter
      </button>
    </div>
  )
}