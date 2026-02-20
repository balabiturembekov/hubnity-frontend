import { Eye, EyeClosed } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { Input } from "@/shared/ui/input";

interface PasswordInputProps extends ComponentProps<"input"> {}

export const PasswordInput = ({ type: _, ...props }: PasswordInputProps) => {
  const [type, setType] = useState<string>("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="relative">
      <Input type={type} {...props} />

      <button
        type="button"
        className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 z-10"
        onClick={handleToggle}
      >
        {type === "password" ? <Eye size={20} /> : <EyeClosed size={20} />}
      </button>
    </div>
  );
};
