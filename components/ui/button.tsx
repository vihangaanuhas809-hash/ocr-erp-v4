import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  href,
  children,
  onClick,
  type = "button",
}: Props) {
  const className =
    "inline-flex items-center rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}