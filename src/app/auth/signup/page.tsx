"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import FormField from "@/components/molecules/FormFiled";
import Link from "next/link";

const SignUpPage = () => {
  const handleChange = () => {
    alert("onchange!");
  };
  return (
    <div className="flex flex-col items-start space-y-2 p-6">
      <h2 className="text-2xl">SIGN UP</h2>
      <FormField
        label="Email"
        value="write your email"
        type="text"
        size="large"
        onChange={handleChange}
      ></FormField>

      <Label>Email</Label>
      <Input size="large" type="email" value="text" onChange={handleChange} />
      <Label>Password</Label>
      <Input
        size="large"
        type="password"
        value="text"
        onChange={handleChange}
      />
      <Button size="medium" color="secondary" onClick={handleChange}>
        {"SIGN UP"}
      </Button>
      <Link href="/SignIn">Back to SignIn</Link>
    </div>
  );
};

export default SignUpPage;
