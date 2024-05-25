/* import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware RUNS", request);

  return NextResponse.redirect(new URL("/about", request.url));
}
*/

import { auth } from "./lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
