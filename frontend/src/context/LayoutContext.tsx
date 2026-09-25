import type React from "react";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const StorageKey = "tabler-navbar-position";
export const Navbar = "horizontal";
export const Sidebar = "vertical";

// Define layout mode types
export type LayoutMode = "horizontal" | "vertical";

interface LayoutContextType {
	layoutMode: LayoutMode;
	toggleLayoutMode: () => void;
	setLayoutMode: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
	children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
	const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(StorageKey) as LayoutMode | null;
			return stored || Navbar;
		}
		return Navbar;
	});

	useEffect(() => {
		document.documentElement.setAttribute("data-bs-navbar-position", layoutMode);
		localStorage.setItem(StorageKey, layoutMode);
	}, [layoutMode]);

	const toggleLayoutMode = () => {
		setLayoutModeState((prev) => (prev === Navbar ? Sidebar : Navbar));
	};

	const setLayoutMode = (mode: LayoutMode) => {
		setLayoutModeState(mode);
	};

	return (
		<LayoutContext.Provider value={{ layoutMode, toggleLayoutMode, setLayoutMode }}>
			{children}
		</LayoutContext.Provider>
	);
};

export function useLayoutMode(): LayoutContextType {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error("useLayoutMode must be used within a LayoutProvider");
	}
	return context;
}
