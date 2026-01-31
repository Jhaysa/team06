import { StickyNote } from "lucide-react";
import Link from "next/link";


export default function Hero() {
    return (
        <section className="h-full w-full flex flex-col items-center ">
            <div className="w-full p-20 flex flex-col items-center text-center">
                <StickyNote size={80} />
                <h1 className="text-6xl font-extrabold mb-4">Taskly.</h1>
                <p className="text-3xl font-bold text-gray-600">Get things done. Simply.</p>
            </div>
            <div className="flex gap-4">
                <Link href="/tasks" className="bg-slate-500 p-3 rounded-xl text-white text-lg hover:shadow-md transition">View Tasks</Link>
                <Link href="/tasks/create" className="bg-blue-500 p-3 rounded-xl text-white text-lg hover:shadow-md transition">Create Task</Link>
            </div>
        </section>
    )
}