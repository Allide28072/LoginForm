import { useEffect } from "react";

const SUFFIX = " | LoginForm";
const DEFAULT_TITLE = "LoginForm | React demo website";

export default function usePageTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title}${SUFFIX}` : DEFAULT_TITLE;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
