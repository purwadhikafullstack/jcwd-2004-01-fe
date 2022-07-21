import { NextResponse } from "next/server";
import API_URL from "../helpers/apiurl";

export async function middleware(req) {
  const token = req.cookies.token;
  console.log(token, "askdajskdjds");
  let response = await fetch(`${API_URL}/auth/check-role`, {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  });
  let data = await response.json();
  let role = data.role_id;

  //Restrict admin from accessing user's page
  if (req.nextUrl.pathname === "/" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/address" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/cart" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/checkout" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/forgotpassword" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/login" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/products" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/register" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname === "/uploadprescription" && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname.includes("/produk") && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname.includes("/resetpassword") && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname.includes("/userprofile") && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname.includes("/verification") && role == "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  //Resctrict unauthorized user from accessing protected pages
  if (req.nextUrl.pathname === "/userprofile/address" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/userprofile/biodata" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/userprofile/transactions" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/cart" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/checkout" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/address" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname === "/uploadprescription" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Do nothing
  if (req.nextUrl.pathname === "/products") {
  }
}
