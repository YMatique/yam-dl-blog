import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login, register } from '@/routes';
import { request } from '@/routes/password';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(login(), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen w-full">
            <Head title="Log in" />

            {/* Left Side - Hero/Branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#5869DA] to-[#2d3d8b] p-10 text-white lg:flex">
                <div className="flex items-center gap-2 font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                    </div>
                    <span>YAMDL</span>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome back to the community.
                    </h1>
                    <p className="text-lg text-white/80">
                        Discover the latest articles, tutorials, and resources
                        to level up your development skills.
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>© 2025 Yam DL Admin</span>
                    <Link
                        href="#"
                        className="transition-colors hover:text-white"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="#"
                        className="transition-colors hover:text-white"
                    >
                        Terms
                    </Link>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full flex-col justify-center bg-background p-8 lg:w-1/2 lg:p-12">
                <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign in to your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to access your dashboard
                        </p>
                    </div>

                    {status && (
                        <div className="rounded-md bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoFocus
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="text-sm font-medium text-[#5869DA] hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData('remember', !!checked)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </Label>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={processing}
                        >
                            {processing && (
                                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link
                            href={register()}
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
