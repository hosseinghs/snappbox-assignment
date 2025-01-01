import CodeInputComponent from "@/components/base/CodeInput";

interface IProps {
    loading: boolean;
    resendOTP: () => void;
    onCompleteOTP: (otp: string) => void;
}

export default function SecondStepRegister({ loading, onCompleteOTP, resendOTP }: IProps) {
    return (
        <CodeInputComponent loading={loading} onResendClick={resendOTP} onSubmit={onCompleteOTP} />
    )
}