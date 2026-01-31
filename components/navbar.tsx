import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full bg-slate-100">
            <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-lg font-extrabold tracking-wide"
                >
                    Taskly.
                </Link>

                <div className="flex gap-6 text-sm">
                    <Link href="/tasks">
                        Tasks
                    </Link>
                </div>

            </nav>
        </header>
    )
}
