import React, { useEffect, useState } from "react";

const MenuList = (props) => {
  const { id, title, icon, path, children: items, isParentCollapsed } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const hasChildren = items && items.length > 0;
  useEffect(() => {
    if (isParentCollapsed) {
      setIsCollapsed(true);
    }
  }, [isParentCollapsed]);
  return (
    <li
      className="text-white font-semibold w-full text-left text-lg mb-3"
      key={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        items?.length && setIsCollapsed((prev) => !prev);
      }}
    >
      <div
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? isCollapsed : undefined} // Accessibility: indicate expand state
        aria-label={
          hasChildren
            ? `${title} - ${isCollapsed ? "Collapse" : "Expand"}`
            : `${title}`
        }
      >
        <a
          href={path}
          className="w-full grid grid-cols-[10%_1fr] text-left gap-x-1.5"
        >
          <i className={icon}></i>
          <label
            htmlFor={title}
            className="w-full flex justify-between items-center"
          >
            <span>{title}</span>
            {items?.length > 0 && (
              <i
                className={`${
                  isCollapsed ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"
                } ml-auto`}
              ></i>
            )}
          </label>
        </a>
      </div>

      {/* Child menus */}
      {hasChildren
        ? items.map((data) => (
            <ul className={`ml-8 mt-2 ${isCollapsed ? "hidden" : "block"}`}>
              <MenuList
                key={data.id}
                id={data.id}
                title={data.title}
                icon={data.icon}
                path={data.path}
                children={data.children}
                isParentCollapsed={isCollapsed}
              />
            </ul>
          ))
        : null}
    </li>
  );
};

export default MenuList;
