import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { usePreviewColors } from "@/hooks/usePreviewColors";

export const InputOTPComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className="w-full p-6 rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${text}`,
      }}
    >
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          {Array.from({ length: 3 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              style={{
                borderColor: text,
                color: text,
              }}
            />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator
          style={{
            color: text,
          }}
        />
        <InputOTPGroup>
          {Array.from({ length: 3 }).map((_, index) => (
            <InputOTPSlot
              key={index + 3}
              index={index + 3}
              style={{
                borderColor: text,
                color: text,
              }}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
