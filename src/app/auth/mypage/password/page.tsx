/** 登録したパスワードの変更フォーム */

"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const PasswordPage = () => {
  const handleChange = () => {
    alert("onchange!");
  };

  return (
    <div className="my-5 ">
      <div className="flex flex-col space-y-2 border-b-2 py-2">
        <h3 className="text-start text-2xl ">Change Your Password</h3>
        <Label className="text-start">Current Password:</Label>
        <Input size="large" type="password" onChange={handleChange}></Input>

        <Label className="text-start">New Password:</Label>
        <Input size="large" type="email" onChange={handleChange}></Input>
        <Button size="small" color="secondary" onClick={handleChange}>
          <BorderColorIcon className="mr-2" />
          CHANGE
        </Button>
        <div className="flex justify-start">
          <BorderLabel href="/auth/mypage">Back to My Page</BorderLabel>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
