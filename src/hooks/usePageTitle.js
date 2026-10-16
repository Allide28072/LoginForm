import { useEffect } from "react";

const SUFFIX = " | LoginForm";
const DEFAULT_TITLE = "LoginForm | React demo website";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title}${SUFFIX}` : DEFAULT_TITLE;
  }, [title]);
}
