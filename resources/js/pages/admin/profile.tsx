import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin-layout';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react'; // Standard Inertia useForm
import { FormEventHandler, useRef } from 'react';

// We assume route() is globally available or imported.
// Since we don't have the generated types yet, we'll cast or use window.route if needed,
// but usually in Laravel Inertia projects route() is available.
// If not, we might need to import { route } from 'ziggy-js'; check if installed later.

export default function AdminProfile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    // --- Profile Information Form ---
    const {
        data: profileData,
        setData: setProfileData,
        patch: patchProfile,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileRecentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        // @ts-ignore
        patchProfile(route('admin.profile.update'));
    };

    // --- Password Update Form ---
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data: passwordData,
        setData: setPasswordData,
        errors: passwordErrors,
        put: putPassword,
        reset: resetPassword,
        processing: passwordProcessing,
        recentlySuccessful: passwordRecentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword: FormEventHandler = (e) => {
        e.preventDefault();

        // Use the standard Fortify route for password updates
        // @ts-ignore
        putPassword(route('user-password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
            onError: (errors: any) => {
                if (errors.password) {
                    resetPassword('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    resetPassword('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AdminLayout>
            <div className="block space-y-6 p-10 pb-16">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Profile & Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your admin account settings and password.
                    </p>
                </div>
                <Separator className="my-6" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <div className="flex-1 space-y-12 lg:max-w-2xl">
                        {/* Profile Information Section */}
                        <div className="space-y-6">
                            <HeadingSmall
                                title="Profile Information"
                                description="Update your account's profile information and email address."
                            />

                            <form
                                onSubmit={submitProfile}
                                className="space-y-6"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        autoComplete="name"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={profileErrors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        autoComplete="username"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={profileErrors.email}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={profileProcessing}>
                                        Save Profile
                                    </Button>
                                    <Transition
                                        show={profileRecentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>

                        <Separator />

                        {/* Update Password Section */}
                        <div className="space-y-6">
                            <HeadingSmall
                                title="Update Password"
                                description="Ensure your account is using a long, random password to stay secure."
                            />

                            <form
                                onSubmit={submitPassword}
                                className="space-y-6"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="current_password">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={passwordData.current_password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                'current_password',
                                                e.target.value,
                                            )
                                        }
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                    />
                                    <InputError
                                        message={
                                            passwordErrors.current_password
                                        }
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        New Password
                                    </Label>
                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={passwordErrors.password}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        value={
                                            passwordData.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={
                                            passwordErrors.password_confirmation
                                        }
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={passwordProcessing}>
                                        Save Password
                                    </Button>
                                    <Transition
                                        show={passwordRecentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
