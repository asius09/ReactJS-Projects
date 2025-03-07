import React, { useEffect, useState } from "react";

const MenuList = (props) => {
  const {
    id,
    title,
    icon,
    path,
    children: items,
    isParentCollapsed,
    isNavCollapsed,
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const hasChildren = items && items.length > 0;

  useEffect(() => {
    if (isNavCollapsed || isParentCollapsed) {
      setIsCollapsed(true);
    }
  }, [isParentCollapsed, isNavCollapsed]);

  const handleClick = (e) => {
    if (items?.length) {
      e.preventDefault();
      e.stopPropagation();
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <li
      className={`text-gray-900 dark:text-gray-300 font-semibold w-full text-left text-lg mb-3`}
      key={id}
    >
      <div
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? !isCollapsed : undefined}
        aria-label={
          hasChildren
            ? `${title} - ${isCollapsed ? "Collapsed" : "Expanded"}`
            : title
        }
        onClick={handleClick}
      >
        <a
          href={path}
          className={`w-full ${
            isNavCollapsed
              ? "flex justify-center"
              : "grid grid-cols-[10%_1fr] text-left gap-x-1.5"
          }`}
        >
          <i
            className={`${icon} ${
              isNavCollapsed ? "text-2xl" : "text-lg"
            } text-gray-900 dark:text-gray-300`}
            aria-hidden="true"
          ></i>
          {!isNavCollapsed ? (
            <div className="w-full flex justify-between items-center">
              <span>{title}</span>
              {hasChildren && (
                <i
                  className={`${
                    isCollapsed ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"
                  } ml-auto`}
                  aria-hidden="true"
                ></i>
              )}
            </div>
          ) : null}
        </a>
      </div>

      {hasChildren && (
        <ul className={`ml-8 mt-2 ${isCollapsed ? "hidden" : "block"}`}>
          {items.map((data) => (
            <MenuList
              key={data.id}
              id={data.id}
              title={data.title}
              icon={data.icon}
              path={data.path}
              children={data.children}
              isParentCollapsed={isCollapsed}
              isNavCollapsed={isNavCollapsed}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuList;
