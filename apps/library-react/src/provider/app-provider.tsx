import React from "react";
type Props = {
  children: React.ReactNode;
};
const AppProvider = ({ children }: Props) => {
  return <>{children}</>;
};

export default AppProvider;
