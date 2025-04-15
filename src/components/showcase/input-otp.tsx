import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { getHexString, useColorStore } from "@/store/colorStore";

export const InputOTPComponent = () => {
  const color = useColorStore();

  return (
    <div
      className="w-full p-6 rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: `1px solid ${getHexString(color.color1)}`,
      }}
    >
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          {Array.from({ length: 3 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              style={{
                borderColor: getHexString(color.color1),
                color: getHexString(color.color1),
              }}
            />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator
          style={{
            color: getHexString(color.color1),
          }}
        />
        <InputOTPGroup>
          {Array.from({ length: 3 }).map((_, index) => (
            <InputOTPSlot
              key={index + 3}
              index={index + 3}
              style={{
                borderColor: getHexString(color.color1),
                color: getHexString(color.color1),
              }}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
