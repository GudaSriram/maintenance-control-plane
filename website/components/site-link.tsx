import type { ComponentProps } from "react";
export function SiteLink({href,...props}:ComponentProps<"a">){
 const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
 const target=href?.startsWith("/")&&!href.startsWith("//")?base+href:href;
 return <a {...props} href={target}/>;
}
