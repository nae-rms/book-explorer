import { useEffect } from "react";

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Dead Poets Archives`
      : "Dead Poets Archives";
  }, [title]);

  return null;
}

export default PageTitle;