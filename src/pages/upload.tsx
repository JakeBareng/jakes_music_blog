import { useSession } from "next-auth/react";

export default function Upload() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    return (
        <>
            <h1>Upload</h1>
            <p>Upload your files here</p>
            <form action="/api/upload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}