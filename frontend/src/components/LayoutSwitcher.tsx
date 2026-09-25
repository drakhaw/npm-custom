import { IconLayoutNavbar, IconLayoutSidebar } from "@tabler/icons-react";
import cn from "classnames";
import { Button } from "src/components";
import { useLayoutMode } from "src/hooks";

interface Props {
	className?: string;
}
function LayoutSwitcher({ className }: Props) {
	const { layoutMode, toggleLayoutMode } = useLayoutMode();
	const isVertical = layoutMode === "vertical";

	return (
		<div className={cn("d-print-none", "d-inline-block", className)}>
			<Button
				size="sm"
				variant="action"
				data-bs-toggle="tooltip"
				data-bs-placement="bottom"
				aria-label={isVertical ? "Switch to navbar layout" : "Switch to sidebar layout"}
				data-bs-original-title={isVertical ? "Switch to navbar layout" : "Switch to sidebar layout"}
				onClick={toggleLayoutMode}
			>
				{isVertical ? <IconLayoutNavbar width={24} /> : <IconLayoutSidebar width={24} />}
			</Button>
		</div>
	);
}

export { LayoutSwitcher };
