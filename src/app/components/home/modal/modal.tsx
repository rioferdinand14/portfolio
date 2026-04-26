"use client";

import { useRouter } from "next/navigation";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ModalProps } from "./modal.type";

const Modal: FC<ModalProps> = ({
  closeClick,
  children,
  showModal,
  runFunctions = true,
  id = "modal",
  bookmarkId,
}) => {
  const router = useRouter();
  const [animationState, setAnimationState] = useState<"open" | "hide" | "close">("open");

  const bodyRef = useRef<HTMLElement | null>(
    typeof window !== "undefined" ? document.body : null,
  );
  
  const clearBookmark = useCallback(() => {
    if (!bookmarkId) return;
    router.back();
  }, [bookmarkId, router]);
  
  //handle close modal
  const handleClose = () => {
    setAnimationState("hide");
    if (bookmarkId) clearBookmark();
  
  };
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!bodyRef.current || !runFunctions) return;
    const body = bodyRef.current;
    const scrollBarCompensation = window.innerWidth - body.offsetWidth;
    body.style.overflowY = "hidden";
    body.style.paddingRight = `${scrollBarCompensation}px`;
    body.style.touchAction = "none";
    (
      body.style as CSSStyleDeclaration & { msTouchAction?: string }
    ).msTouchAction = "none";
    return () => {
      body.style.overflowY = "auto";
      body.style.paddingRight = "0";
      body.style.touchAction = "";
      (
        body.style as CSSStyleDeclaration & { msTouchAction?: string }
      ).msTouchAction = "";
    };
  }, [runFunctions]);
  
  // Handle open/close state transitions
  useEffect(() => {
    if (animationState === "hide") {
      const timer = setTimeout(() => closeClick(), 300);
      return () => clearTimeout(timer);
    }
  }, [animationState, closeClick]);
  
  // Handle bookmark behavior and back button
  useEffect(() => {
    if (bookmarkId && showModal === "open") {
      window.location.hash = bookmarkId;
    } else if (bookmarkId && showModal === "hide") {
      clearBookmark();
    }
    const handlePopState = () => {
      if (showModal === "open") {
        setAnimationState("hide");
      }
    };
    setAnimationState(showModal);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, bookmarkId]);

  if (!bodyRef.current) return null;
  return (
    //create portal for added this component to the  body  element because this make  modal easy to  use (no z-index  and overflow problems)
    createPortal(
      <>
        <article
          className="p-5 grid overflow-auto z-[102] items-center no-scroll max-xs:grid-cols-1 fixed top-0 left-0 h-full w-full cursor-pointer justify-items-center"
          onClick={handleClose}
          id={id}
        >
          <div
            className={`${
              animationState == "open" ? "scale-in-center-open" : "scale-in-center-close"
            } flex items-center justify-center relative z-[101] w-full h-full p-4 md:p-10`}
            
            onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </article>
        {/* dark glass background */}
        <div
          className={` ${
            animationState == "open" ? "fade-open" : "fade-close"
          } z-[101] glass fixed top-0 left-0 h-full w-full`}
          style={{ transform: "scale(1)" }}
        />
      </>,
      bodyRef.current,
    )
  );
};
export default memo(Modal);
