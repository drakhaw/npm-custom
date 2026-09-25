import { IconDeviceDesktop } from "@tabler/icons-react";
import cn from "classnames";
import React from "react";
import { HasPermission, LayoutSwitcher, NavLink, ThemeSwitcher } from "src/components";
import type { MenuItem } from "src/components/menuItems";
import { menuItems } from "src/components/menuItems";
import { T } from "src/locale";
import { VIEW } from "src/modules/Permissions";
import styles from "./SiteHeader.module.css";
import styles2 from "./SiteSidebar.module.css";

const getSidebarItem = (item: MenuItem, onClick?: () => void) => {
	if (item.items && item.items.length > 0) {
		return getSidebarDropdown(item, onClick);
	}

	return (
		<HasPermission
			key={`sidebar-item-${item.label}`}
			section={item.permissionSection}
			permission={item.permission || VIEW}
			hideError
		>
			<li className="nav-item">
				<NavLink to={item.to} onClick={onClick}>
					<span className="nav-link-icon">
						{item.icon && React.createElement(item.icon, { height: 24, width: 24 })}
					</span>
					<span className="nav-link-title">
						<T id={item.label} />
					</span>
				</NavLink>
			</li>
		</HasPermission>
	);
};

const getSidebarDropdown = (item: MenuItem, onClick?: () => void) => {
	const cns = cn("nav-item", "dropdown");
	return (
		<HasPermission
			key={`sidebar-item-${item.label}`}
			section={item.permissionSection}
			permission={item.permission || VIEW}
			hideError
		>
			<li className={cns}>
				<a
					className="nav-link dropdown-toggle"
					href={item.to}
					data-bs-toggle="dropdown"
					data-bs-auto-close="outside"
					aria-expanded="false"
					role="button"
				>
					<span className="nav-link-icon">
						<IconDeviceDesktop height={24} width={24} />
					</span>
					<span className="nav-link-title">
						<T id={item.label} />
					</span>
				</a>
				<div className="dropdown-menu">
					{item.items?.map((subitem, idx) => {
						return (
							<HasPermission
								key={`${idx}-${subitem.to}`}
								section={subitem.permissionSection}
								permission={subitem.permission || VIEW}
								hideError
							>
								<NavLink to={subitem.to} isDropdownItem onClick={onClick}>
									<T id={subitem.label} />
								</NavLink>
							</HasPermission>
						);
					})}
				</div>
			</li>
		</HasPermission>
	);
};

export function SiteSidebar() {
	const closeMenu = () =>
		setTimeout(() => {
			const navbarToggler = document.querySelector<HTMLElement>('[data-bs-target="#sidebar-menu"]');
			const navbarMenu = document.querySelector("#sidebar-menu");
			if (navbarToggler && navbarMenu?.classList.contains("show")) {
				navbarToggler.click();
			}
		}, 300);

	return (
		<aside className={cn("navbar", "navbar-vertical", "navbar-expand-lg", styles2.sidebar)}>
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#sidebar-menu"
					aria-controls="sidebar-menu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="navbar-brand navbar-brand-autodark">
					<NavLink to="/" onClick={closeMenu}>
						<div className={styles.logo}>
							<img src="/images/logo-no-text.svg" width={32} height={32} alt="Logo" className="navbar-brand-image" />
						</div>
						Nginx Proxy Manager
					</NavLink>
				</div>
				<div className="collapse navbar-collapse" id="sidebar-menu">
					<ul className="navbar-nav pt-lg-3">
						{menuItems.length > 0 &&
							menuItems.map((item) => {
								return getSidebarItem(item, closeMenu);
							})}
					</ul>
				</div>
				<div className="navbar-footer">
					<div className="navbar-side">
						<ul className="navbar-nav flex-row">
							<li className="nav-item">
								<LayoutSwitcher />
							</li>
							<li className="nav-item">
								<ThemeSwitcher />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
}
