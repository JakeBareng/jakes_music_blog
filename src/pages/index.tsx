import Visualizer from "@/components/visualizer/visualizer";
import { useState } from "react";

export default function index() {
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
      <button onClick={() => setPlay(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Enter
      </button>
    </div>
  )
}