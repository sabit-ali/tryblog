import ChangePasswordForm from '@/components/ChangePasswordForm';
import React from 'react';
import User from '@/app/models/UserModel';
interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    if (searchParams.token) {
        const user = await User.findOne({
                password_reset_token: searchParams.token as string,
        });
        if (!user) {
            return <div>Invalid token</div>;
        }

        return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    }
};

export default ResetPasswordPage;