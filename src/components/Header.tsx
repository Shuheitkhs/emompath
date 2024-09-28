import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex h-[50px] items-center">
      <div>
        <Link href={"/emoms"}>
          <h1 className="text-3xl mr-2">EMOM Path</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"/emoms"}>
          <img
            src="/logo.png"
            alt="logo of EMOM Path"
            className="h-[30px] object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center ml-auto">
        <Link href={"/auth/mypage"}>
          <img
            src="/mypage.png"
            alt="to mypage"
            className="h-[30px] object-contain"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
