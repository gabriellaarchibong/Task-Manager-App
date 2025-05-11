import type { Props } from "../types";

function Layout({children}: Props) {
  return (
	<div className="p-4 max-w-xl mx-auto h-full">{children}</div>
  )
}

export default Layout