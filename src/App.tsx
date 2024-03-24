// App.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form';
import { Input } from './components/ui/input';
import './index.css';

const formSchema = z
	.object({
		password: z.string(),
	})
	.superRefine(({ password }, ctx) => {
		type err = { code: string; message: string };
		const errors: err[] = [];
		if (!/[a-z]/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'At least one lowercase letter should be added' });
		}
		if (!/[A-Z]/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'At least one uppercase letter should be added' });
		}
		if (!/\d+/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'At least one digit should be added' });
		}
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'At least one special character should be added' });
		}
		if (!/.{8,}/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'Minimum 8 characters should be present' });
		}
		if (/.{13,}/.test(password)) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'maximum 12 characters are only allowed' });
		}

		if (errors.length > 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errors.map((error) => error.message).join(', '),
				path: ['password'],
			});
		}

		return true;
	});

const App: React.FC = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50">
			<div className="space-x-5">
				<button className="relative overflow-hidden rounded-sm bg-red-700 px-5 py-3 text-lg font-medium uppercase tracking-wider text-[#ffb4b4] text-gray-50 shadow-md shadow-gray-400/50">
					Button
				</button>
				<button className="relative overflow-hidden rounded-sm bg-gradient-to-r from-indigo-400 to-cyan-400 px-5 py-3 text-lg font-medium uppercase tracking-wider text-gray-50 shadow-md shadow-gray-400/50 ">
					Button
				</button>
			</div>
			<Button className="mx-5 bg-opacity-80 px-10 py-7" colors={'primary'} ripple>
				ss
			</Button>

			<Button className="mx-5 bg-btn-primary px-10  py-7 text-btn-primary-foreground" variant={'default'} colors={'success'} ripple>
				red
			</Button>

			<Button className="mx-5 px-10  py-7" variant={'contained'} colors={'success'} ripple>
				success
			</Button>

			<Form {...form}>
				<form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>password</FormLabel>
								<FormControl>
									<Input {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} maxLength={13} />
								</FormControl>
								{form.formState?.errors?.password?.message ? (
									<>
										<ul>{form.formState?.errors?.password?.message?.split(',').map((err) => <li className="text-[red]">{err}</li>)}</ul>
									</>
								) : (
									<></>
								)}
							</FormItem>
						)}
					/>
					<Button type="submit" variant="contained" colors="primary">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default App;
