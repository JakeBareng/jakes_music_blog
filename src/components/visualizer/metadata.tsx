import { Song } from "@/models/song";

export default function Metadata({metadata}: {metadata: Song}) {

    return (
            <div className="absolute top-24 left-0 right-0 flex flex-col flex-grow-2 items-center text-center w-full">
                <p className="font-josefin text-lg font-semibold">{metadata.title}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">BPM: {metadata.bpm}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">key: {metadata.key}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">Date: {String(new Date(metadata.createdAt).toDateString())}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">Producers: {metadata.producers.join(", ")}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">Songwriters: {metadata.songwriters.join(", ")}</p>
                <p className="font-josefin text-sm opacity-60 font-normal">Tags: {metadata.tags.join(", ")}</p>
            </div>
    )
}

