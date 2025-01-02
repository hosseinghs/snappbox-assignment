import React, { useEffect, useRef, useState } from "react";

interface IProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
  position?: 'top' | 'bottom';
}

export default function CustomPopup({
  open,
  message,
  onClose,
  children,
  onConfirm,
  position = "bottom",
}: IProps) {

  const popupRef = useRef(null);
  const targetRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const popupHeight = popupRef.current?.offsetHeight || 0;

      const styles = {
        left: `${targetRect.left + window.scrollX}px`,
        top:
          position === "top"
            ? `${targetRect.top - popupHeight + window.scrollY}px`
            : `${targetRect.bottom + window.scrollY}px`,
      };

      setPopupStyle(styles);
    }
  }, [open, position]);

  return (
    <>
      {open && (
        <>
          {/* Overlay layer */}
          <div
            ref={overlayRef}
            className="fixed top-0 left-0 w-full h-full opacity-30 z-30"
            onClick={onClose}
          />

          {/* Popup content */}
          <div
            ref={popupRef}
            className="absolute px-4 py-2 rounded shadow-2xl border-[1px] border-solid z-50"
            style={popupStyle}
          >
            <div className="">
              <div>{message}</div>
              <div className="flex justify-center items-center">
                <button
                  className="ml-4 text-red-400 hover:text-red-600 focus:outline-none"
                  onClick={onClose}
                  >
                  No
                </button>
                <button
                  className="ml-4 text-red-400 hover:text-red-600 focus:outline-none"
                  onClick={onConfirm}
                  >
                  Yes
                </button>
                </div>
            </div>
          </div>
        </>
      )}
      <div ref={targetRef}>{children}</div>
    </>
  );
}
