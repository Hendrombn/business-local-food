'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import styles from './Sidebar.module.css';
import type { SidebarProps, SidebarItem } from './Sidebar.types';

export default function Sidebar({
  items,
  isOpen = true,
  onToggle,
  className,
  header,
  footer,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.(!isCollapsed);
  };

  const sidebarClasses = [
    styles.sidebar,
    isCollapsed ? styles.collapsed : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={sidebarClasses}>
      <div className={styles.header}>
        {header && !isCollapsed && (
          <div className={styles.headerContent}>{header}</div>
        )}
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {items.map((item, index) => (
          <SidebarNavItem
            key={item.id || index}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {footer && !isCollapsed && <div className={styles.footer}>{footer}</div>}
    </aside>
  );
}

function SidebarNavItem({
  item,
  isCollapsed,
}: {
  item: SidebarItem;
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    } else {
      item.onClick?.();
    }
  };

  const isActive = item.isActive || false;

  return (
    <div className={styles.navItemWrapper}>
      <button
        className={[
          styles.navItem,
          isActive ? styles.active : '',
          isCollapsed ? styles.collapsedItem : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
      >
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        {!isCollapsed && <span className={styles.label}>{item.label}</span>}
        {!isCollapsed && item.children && (
          <span className={styles.chevron}>{isOpen ? '▾' : '▸'}</span>
        )}
      </button>

      {!isCollapsed && item.children && isOpen && (
        <div className={styles.subNav}>
          {item.children.map((child, index) => (
            <button
              key={child.id || index}
              className={[
                styles.subNavItem,
                child.isActive ? styles.active : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={child.onClick}
            >
              {child.icon && <span className={styles.icon}>{child.icon}</span>}
              <span className={styles.label}>{child.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
