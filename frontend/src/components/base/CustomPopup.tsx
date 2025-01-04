import { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";
interface IProps {
  open: boolean;
  onClose: () => void;
  position?: 'top' | 'bottom';
  bodyContent: ReactNode;
  targetElement?: ReactNode;
}

export default function CustomPopup({
  open,
  // message,
  onClose,
  // onConfirm,
  bodyContent,
  targetElement,
  position = "bottom",
}: IProps) {
  const popupRef = useRef(null);
  const targetRef = useRef(null);
  const overlayRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState<any>({});

  useEffect(() => {
    if (open && targetRef.current && popupRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const popupHeight = popupRef.current?.offsetHeight || 0;
      const popupWidth = popupRef.current?.offsetWidth || 0;

      // Calculate position based on the target and screen edges
      const styles: CSSProperties = {
        top:
          position === "top"
          ? `${targetRect.top - popupHeight + window.scrollY}px`
          : `${targetRect.bottom + window.scrollY}px`,
        left: `${targetRect.left - window.scrollX}px`,
        width: 'auto',
        zIndex: 1301, // Ensure it appears above MUI elements, which have z-index starting at 1300
        maxWidth: '300px', // Optional, to limit the width of the popup
        transform: 'translateX(-50%)', // Center horizontally
      };

      // Handle case when popup goes off the screen horizontally
      if (styles.left && popupWidth && window.innerWidth < targetRect.left + popupWidth) styles.left = `${window.innerWidth - popupWidth - 20}px`; // Adjust for right edge

      // Handle vertical positioning near edges of the viewport
      if (position === "top" && targetRect.top - popupHeight < 0) styles.top = `${targetRect.bottom + window.scrollY}px`; // Position below if not enough space above

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
            onClick={onClose}
          />

          {/* Popup content */}
          <div
            ref={popupRef}
            className="absolute px-4 py-2 rounded shadow-2xl border-[1px] border-solid bg-white z-50"
            style={popupStyle}
          >
            <div id="content">
              {bodyContent}
            </div>
          </div>
        </>
      )}
      <div ref={targetRef}>{targetElement}</div>
    </>
  );
}
