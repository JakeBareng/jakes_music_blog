import { set } from "mongoose";
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
    const [key, setKey] = useState<string>('');
    const [producers, setProducers] = useState<string[]>([]);
    const [songwriters, setSongwriters] = useState<string[]>([]);

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
        setError('');
        setKey('');
    }

    function checkInputs() {
        if (!file) {
            setError('Please select a file');
            return false;
        }
        if (title === '') {
            setError('Please enter a title');
            return false;
        }
        if (bpm === 0) {
            setError('Please enter a BPM');
            return false;
        }
        return true;
    }

    async function handleUpload(event: any) {
        event.preventDefault();
        if (!checkInputs())
            return setError('Please check your inputs')

        try {
            const filename = encodeURIComponent(file?.name ?? '');
            console.log('filename', filename);
            const res = await fetch('/api/getSignedUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: filename,
                }),
            });
            if (res.status !== 200)
                throw new Error('Error getting signed URL');

            const { url } = await res.json();
            const resFileUpload = await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file?.type || '',
                },
                mode: 'cors',
                cache: 'no-cache',
            })
            if (resFileUpload.status !== 200)
                throw new Error('Error uploading file');

            // upload metadata to database
            const metadataUpload = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    bpm,
                    tags,
                    key,
                    filename,
                    producers,
                    songwriters,
                }),
            })
            if (metadataUpload.status !== 200)
                throw new Error('Error uploading metadata');
        } catch (error) {
            setError('Error uploading file');
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
        else {
            setError('Tag already exists');
            return;
        }
        setTagValue('');
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        setFile(file);
    }

    const removeTag = (index: number) => {
        setTags(prevTags => prevTags.filter((_, i) => i !== index));
    }

    const addProducer = (event: any) => {
        event.preventDefault();
        const producer = event.target.value;
        setProducers(prevProducers => [...prevProducers, producer]);
    }
    const addSongwriter = (event: any) => {
        event.preventDefault();
        const songwriter = event.target.value;
        setSongwriters(prevSongwriters => [...prevSongwriters, songwriter]);
    }

    const allKeys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    return (
        <>
            <h1>Upload</h1>
            <p>Upload your files here</p>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <input type="file" name="file" onChange={handleFileChange} />
                <input type="text" name="title" placeholder="Title" value={title} onChange={e => { setTitle(e.target.value) }} />
                <input type="number" name="bpm" min={0} placeholder="BPM" onChange={e => { setBpm(e.target.valueAsNumber) }} value={bpm} />
                <select name="key" id="key" onChange={(event) => {setKey(event.target.value)}} value={key}>
                    {allKeys.map((key, index) => (
                        <option key={index} value={key}>{key}</option>
                    ))}
                </select>
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
                            <>
                                <li key={index}>{tag}</li>
                                <button type="button" onClick={() => { removeTag(index) }}>Remove</button>
                            </>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Producers</h2>
                    <input type="text" name="producer" placeholder="Add producer" onChange={addProducer} />
                    <ul>
                        {producers.map((producer, index) => (
                            <li key={index}>{producer}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Songwriters</h2>
                    <input type="text" name="songwriter" placeholder="Add songwriter" onChange={addSongwriter} />
                    <ul>
                        {songwriters.map((songwriter, index) => (
                            <li key={index}>{songwriter}</li>
                        ))}
                    </ul>
                </section>
                <button type="submit">Upload</button>
                <p>{error}</p>
            </form>
        </>
    )
}