import React from "react";

const Container = ({ children, className = "", withYPadding = true }) => {
  const spacingClasses = withYPadding
    ? "py-10 md:py-12 2xl:py-24 px-3 md:px-8 lg:px-44 2xl:px-80"
    : "px-3 md:px-8 lg:px-44 2xl:px-80";

  return <div className={`${spacingClasses} ${className}`}>{children}</div>;
};

export default Container;
