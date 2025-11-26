import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { login, register } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(register(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen w-full">
            <Head title="Register" />
            
            {/* Left Side - Hero/Branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-zinc-900 p-10 text-white lg:flex">
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
                    <span>Yam DL Blog</span>
                </div>
                
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Join our community today.
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Create an account to start writing, sharing, and connecting with other developers.
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>© 2025 Yam DL Blog</span>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex w-full flex-col justify-center bg-background p-8 lg:w-1/2 lg:p-12">
                <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details below to create your account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                    autoComplete="name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <Button className="w-full" type="submit" disabled={processing}>
                            {processing && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            href={login()}
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
