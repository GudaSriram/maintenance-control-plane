import {readFileSync,writeFileSync} from "node:fs";
let css="";
for(const weight of [400,500,600,700]){const bytes=readFileSync(`public/fonts/inter-latin-${weight}-normal.woff2`);css+=`@font-face{font-family:Inter;font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${bytes.toString("base64")}) format("woff2")}\n`;}
writeFileSync("app/fonts.generated.css",css);
