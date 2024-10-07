import Link from "next/link";

export const NavItem = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => {
    return (
        <li className="hover:text-white">
            {href ? (
                <Link href={href} >
                    {label}
                </Link>
            ) : (
                <span>
                    {label}
                </span>
            )}
        </li>
    );
}

export const NavButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
    return (
            <div className="box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8">
                <button
                    className="text-nav-text text-[1.5vw] pt-1 cursor-pointer"
                    onClick={onClick}
                >
                    {label}
                </button>
            </div>
    )
}