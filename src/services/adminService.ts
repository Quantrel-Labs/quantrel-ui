// DOCS: Admin utilities for managing user roles
// Only admins should be able to use these functions

import { doc, updateDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ROLES, Role } from "@/lib/roles"

export async function promoteUserToAdmin(email: string) {
  try {
    // Find user by email
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      throw new Error("User not found")
    }

    const userDoc = querySnapshot.docs[0]
    await updateDoc(doc(db, "users", userDoc.id), {
      role: ROLES.ADMIN
    })

    return { success: true, message: "User promoted to admin successfully" }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateUserRole(userId: string, newRole: Role) {
  try {
    await updateDoc(doc(db, "users", userId), {
      role: newRole
    })
    return { success: true, message: "User role updated successfully" }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getAllUsers() {
  try {
    const usersRef = collection(db, "users")
    const querySnapshot = await getDocs(usersRef)
    
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return { success: true, users }
  } catch (error: any) {
    return { success: false, error: error.message, users: [] }
  }
}