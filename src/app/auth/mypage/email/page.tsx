"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import BorderLabel from "@/components/atoms/BorderLabel";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const EmailPage = () => {
  const handleChange = () => {
    alert("onchange!");
  };

  const currentEmail = "XXXXXXX@XXXX.com";
  return (
    <div className="my-5 ">
      <div className="flex flex-col space-y-2 border-b-2 py-2">
        <h3 className="text-start text-2xl ">Change Your Email</h3>
        <Label className="text-start">Current Email:</Label>
        <Label className="text-start text-2xl">{currentEmail}</Label>

        <Label className="text-start">New Email:</Label>
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

export default EmailPage;
