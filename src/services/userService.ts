// DOCS: Firestore helpers for user profile. We store role here to drive RBAC.

import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Role } from "@/lib/roles"

export type UserProfile = {
  uid: string
  email: string | null
  displayName: string | null
  role: Role
  createdAt: number
}

export async function ensureUserProfile(uid: string, profile: Partial<UserProfile>) {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data() as UserProfile
  const data: UserProfile = {
    uid,
    email: profile.email ?? null,
    displayName: profile.displayName ?? null,
    role: (profile.role ?? "customer") as Role,
    createdAt: Date.now(),
  }
  await setDoc(ref, data)
  return data
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  const ref = doc(db, "users", uid)
  await setDoc(ref, updates, { merge: true })
  const snap = await getDoc(ref)
  return snap.data() as UserProfile
}

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid))
  return snap.exists() ? (snap.data() as UserProfile) : null
}
