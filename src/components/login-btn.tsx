import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
  const { data: session } : any = useSession()
  if (session) {
    return (
        <button onClick={() => signOut()}>Sign out</button>
    )
  }
  return (
      <button onClick={() => signIn()}>Sign in</button>
  )
}