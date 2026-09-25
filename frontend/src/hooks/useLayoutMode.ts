import { Navbar, Sidebar, useLayoutMode as useLayoutModeContext } from "src/context";

// Simple hook wrapper for clarity and scalability
const useLayoutMode = () => {
	return useLayoutModeContext();
};

export { useLayoutMode, Navbar, Sidebar };
