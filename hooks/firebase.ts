import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useFirebase } from "../providers/firebase";

export function useAuth() {
  const { auth } = useFirebase()
  const [state, setState] = useState<User | null>(null)

  useEffect(() => {
    setState(auth.currentUser)
    const unsubscribe = auth.onIdTokenChanged(setState)
    return () => {
      unsubscribe()
    }
  }, [])

  return state
}
