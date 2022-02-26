export const scrollIntoView = (messageRef: React.RefObject<HTMLDivElement>) => {
  messageRef.current?.scrollIntoView({
    behavior: "smooth",
  });
};
