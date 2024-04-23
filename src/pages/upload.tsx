import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Upload() {
    const { data: session, status } = useSession();
    const [tagValue, setTagValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [bpm, setBpm] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>('');

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    function clearInputs() {
        setFile(null);
        setTitle('');
        setBpm(0);
        setTags([]);
        setTagValue('');
    }

    function handleUpload(event: any){
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file as Blob);
        formData.append('title', title);
        formData.append('bpm', bpm.toString());
        formData.append('tags', JSON.stringify(tags));
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                clearInputs();
                setError(null);
            } else {
                setError('Failed to upload file');
            }
        }).catch(error => {
            setError(error.message);
        });
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


    return (
        <>
            <h1>Upload</h1>
            <p>Upload your files here</p>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" onChange={
                    (event) => {
                        const selectedFile = event.target.files?.[0];
                        if (selectedFile) {
                            setFile(selectedFile);
                        }
                    }
                }
                value={
                    file ? file.name : ''
                }
                />
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