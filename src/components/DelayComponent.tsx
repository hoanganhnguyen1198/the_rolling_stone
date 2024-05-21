import { ReactNode, useEffect, useState } from "react";

interface DelayComponentProps {
  initState: boolean;
  delayTime: number;

  children: ReactNode;
}

const DelayComponent = ({
  initState,
  delayTime,
  children,
}: DelayComponentProps) => {
  const [show, setShow] = useState(initState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!initState);
    }, delayTime);

    return () => clearTimeout(timeout);
  }, [show]);

  if (!show) return null;

  return children;
};

export default DelayComponent;
