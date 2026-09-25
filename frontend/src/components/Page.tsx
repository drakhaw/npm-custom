import cn from "classnames";

interface Props {
	children: React.ReactNode;
	className?: string;
}
export function Page({ children, className }: Props) {
	return <div className={cn("page", className)}>{children}</div>;
}
