// DOCS: Central auth provider:
// - Tracks Firebase user + Firestore profile (role)
// - Email/password signup (sends verification), login
// - Google sign-in
// - Exposes sendVerifyEmail + signOut
// - Gatekeeping is done via ProtectedRoute & RoleRoute

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth, googleProvider } from "@/lib/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
  User,
} from "firebase/auth"
import { ensureUserProfile, getUserProfile, updateUserProfile, UserProfile } from "@/services/userService"
import { DEFAULT_ROLE, Role } from "@/lib/roles"

type AuthCtx = {
  user: User | null
  profile: UserProfile | null
  role?: Role
  loading: boolean
  signUpEmail: (email: string, password: string, displayName?: string, role?: Role) => Promise<void>
  signInEmail: (email: string, password: string) => Promise<void>
  signInGoogle: () => Promise<void>
  sendVerifyEmail: () => Promise<void>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const existing = await getUserProfile(u.uid)
        const p = existing ?? (await ensureUserProfile(u.uid, {
          email: u.email,
          displayName: u.displayName,
          role: DEFAULT_ROLE,
        }))
        setProfile(p)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const role = profile?.role

  const signUpEmail = async (email: string, password: string, displayName?: string, role?: Role) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) await updateProfile(cred.user, { displayName })
    await ensureUserProfile(cred.user.uid, {
      email: cred.user.email,
      displayName: cred.user.displayName ?? displayName ?? null,
      role: role ?? DEFAULT_ROLE,
    })
    await sendEmailVerification(cred.user)
  }

  const signInEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signInGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider)
    await ensureUserProfile(cred.user.uid, {
      email: cred.user.email,
      displayName: cred.user.displayName,
      role: DEFAULT_ROLE,
    })
  }

  const sendVerifyEmail = async () => {
    if (auth.currentUser) await sendEmailVerification(auth.currentUser)
  }

  const signOut = async () => {
    await fbSignOut(auth)
  }

  const value = useMemo(
    () => ({ user, profile, role, loading, signUpEmail, signInEmail, signInGoogle, sendVerifyEmail, signOut }),
    [user, profile, role, loading]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAuthCtx = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error("useAuthCtx must be used within AuthProvider")
  return v
}
