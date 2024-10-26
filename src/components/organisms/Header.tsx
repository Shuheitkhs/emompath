// ヘッダーコンポーネント・セッションの有無によってMyPageを出し分ける。
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconUsers } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

function Header() {
  const [showMypage, setShowMypage] = useState(false);

  const fetchSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      }

      if (!data.session || error) {
        setShowMypage(false);
      } else {
        setShowMypage(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setShowMypage(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <div className="flex h-[50px] items-center">
      <div>
        <Link href={"/emoms"}>
          <h1 className="text-3xl mr-2">EMOM Path</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"/emoms"}>
          <Image
            width={50}
            height={50}
            src="/logo.png"
            alt="logo of EMOM Path"
            className="h-[30px] object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center ml-auto">
        {showMypage && (
          <Link href={"/auth/mypage"} className="flex items-center space-x-1">
            <IconUsers stroke={3} />
            <p className="inline-block font-bold">MyPage</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
