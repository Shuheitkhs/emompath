"use client";
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  const handleAgree = () => {
    alert("Agreed!");
  };

  const handleDisagree = () => {
    alert("Disagreed!");
  };
  return (
    <div className="flex flex-col my-5">
      <div className="space-y-4">
        <Button size="large" color="secondary">
          <Link href="/emoms">EMOM List</Link>
        </Button>
        <Button size="large" color="danger">
          Logout
        </Button>
        <Button size="large" color="danger">
          <Link href="/mypage/email">Change Email</Link>
        </Button>
        <Button size="large" color="danger">
          <Link href="/mypage/password">Change Password</Link>
        </Button>
      </div>
      <div>
        <div className="my-5">
          <AlertDialog
            trigger={
              <p className=" inline-block text-blue-500 border-b  border-blue-500 hover:text-blue-700 hover:border-blue-700">
                Delete Account?
              </p>
            }
            title="Delete your account?"
            content="Previous logs will also be lost."
            agreeText="Yes"
            disagreeText="No"
            onAgree={handleAgree}
            onDisagree={handleDisagree}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
