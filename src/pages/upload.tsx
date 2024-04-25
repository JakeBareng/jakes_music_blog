import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Upload() {
    const { data: session, status } = useSession();
    const [file, setFile] = useState<File | undefined>(undefined);
    const [tagValue, setTagValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [bpm, setBpm] = useState<number>(0);
    const [error, setError] = useState<string | null>('');

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    function clearInputs() {
        setTitle('');
        setBpm(0);
        setTags([]);
        setTagValue('');
        setFile(undefined);
    }

    async function handleUpload(event: any) {
        event.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const res = await fetch('/api/getSignedUrl',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        if (res.status === 200) {
            const { url } = await res.json();
            console.log(url);
            await fetch (url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
                mode: 'cors',
                cache: 'no-cache',
            })
        }
    }


    function addTag(event: any) {
        event.preventDefault();
        const tag = tagValue;

        //sanitise the tag
        tag.trim(); // remove whitespace 
        tag.toLowerCase(); // make lowercase
        tag.replace(/[^a-zA-Z0-9]/g, '');//remove special characters
        if (!tags.includes(tag)) {
            setTags(prevTags => [...prevTags, tag]);
        }
        setTagValue('');
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        setFile(file);
    }

    return (
        <>
            <h1>Upload</h1>
            <p>Upload your files here</p>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <input type="file" name="file" onChange={handleFileChange} />
                <input type="text" name="title" placeholder="Title" value={title} onChange={e => { setTitle(e.target.value) }} />
                <input type="number" name="bpm" min={0} placeholder="BPM" onChange={e => { setBpm(e.target.valueAsNumber) }} value={bpm} />

                <section>
                    <h2>Tags</h2>
                    <input type="text" name="tag" placeholder="Add tag" onChange={
                        (event) => {
                            setTagValue(event.target.value);
                        }
                    } onKeyDown={
                        (event) => {
                            if (event.key === 'Enter') {
                                addTag(event);
                            }
                        }
                    }
                        value={tagValue}
                    />
                    <button type="button" onClick={
                        (event) => {
                            addTag(event);
                        }
                    } >Add</button>
                    <ul>
                        {tags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </section>
                <button type="submit">Upload</button>
                <p>{error}</p>
            </form>
        </>
    )
}