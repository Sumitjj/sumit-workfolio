import { redirect } from "next/navigation";

// Redirect any unmatched route to the homepage
export default function NotFound() {
    redirect("/");
}


