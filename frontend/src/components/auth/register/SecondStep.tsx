import CodeInputComponent from "@/components/base/CodeInput";

interface IProps {
    resendOTP: () => void;
    onCompleteOTP: (otp: string) => void;
}

export default function SecondStepRegister({ onCompleteOTP, resendOTP }: IProps) {
    return (
        <CodeInputComponent onResendClick={resendOTP} onSubmit={onCompleteOTP} />
    )
}