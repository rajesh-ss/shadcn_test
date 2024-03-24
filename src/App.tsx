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

	if (form?.formState?.errors?.password?.message) {
		console.log(form.formState.errors.password.message.split(',').length);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50">
			{/* <Button className="mx-5 bg-opacity-80 px-10 py-7" colors={'primary'} ripple>
				ss
			</Button> */}

			{/* <Button className="mx-5 bg-btn-primary px-10  py-7 text-btn-primary-foreground" variant={'default'} colors={'success'} ripple>
				red
			</Button> */}

			{/* <Button className="mx-5 px-10  py-7" variant={'contained'} colors={'success'} ripple>
				success
			</Button> */}

			<Form {...form}>
				<form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>password</FormLabel>
								<FormControl>
									<Input id="hs-strong-password-base" {...field} onChange={(e) => field.onChange(e.target.value)} maxLength={12} />
								</FormControl>
								{form.formState?.errors?.password?.message ? (
									<>
										<div className="grid w-full grid-cols-12 gap-2 border-0 border-[red]">
											<div
												className={`col-span-3 h-2 rounded-xl 
												${form.formState.errors.password.message.split(',').length > 3 && form.formState.errors.password.message.split(',').length <= 5 ? 'bg-[red]' : ''}
												${form.formState.errors.password.message.split(',').length <= 3 && form.formState.errors.password.message.split(',').length >= 1 ? 'bg-[orange]' : ''}
												${form.formState.errors.password.message.split(',').length <= 1 && form.formState.errors.password.message.split(',').length > 0 ? 'bg-[green]' : ''}
												${form.formState.errors.password.message.split(',').length < 5 ? 'block' : 'hidden'}`}
											></div>
											<div
												className={`col-span-3 h-2 rounded-xl 
												${form.formState.errors.password.message.split(',').length > 3 && form.formState.errors.password.message.split(',').length <= 5 ? 'bg-[red]' : ''}
												${form.formState.errors.password.message.split(',').length <= 3 && form.formState.errors.password.message.split(',').length >= 1 ? 'bg-[orange]' : ''}
												${form.formState.errors.password.message.split(',').length < 1 && form.formState.errors.password.message.split(',').length > 0 ? 'bg-[green]' : ''}
												${form.formState.errors.password.message.split(',').length <= 1 ? 'block' : 'hidden'}`}
											></div>
											<div
												className={`col-span-3 h-2 rounded-xl 
												${form.formState.errors.password.message.split(',').length > 3 && form.formState.errors.password.message.split(',').length <= 5 ? 'bg-[red]' : ''}
												${form.formState.errors.password.message.split(',').length <= 3 && form.formState.errors.password.message.split(',').length >= 1 ? 'bg-[orange]' : ''}
												${form.formState.errors.password.message.split(',').length < 1 && form.formState.errors.password.message.split(',').length > 0 ? 'bg-[green]' : ''}
												${form.formState.errors.password.message.split(',').length <= 2 ? 'block' : 'hidden'}`}
											></div>
											<div
												className={`col-span-3 h-2 rounded-xl 
												${form.formState.errors.password.message.split(',').length > 3 && form.formState.errors.password.message.split(',').length <= 5 ? 'bg-[red]' : ''}
												${form.formState.errors.password.message.split(',').length <= 3 && form.formState.errors.password.message.split(',').length >= 1 ? 'bg-[orange]' : ''}
												${form.formState.errors.password.message.split(',').length < 1 && form.formState.errors.password.message.split(',').length > 0 ? 'bg-[green]' : ''}
												${form.formState.errors.password.message.split(',').length <= 3 ? 'block' : 'hidden'}`}
											></div>
										</div>
									</>
								) : (
									<>
										<div className="grid w-full grid-cols-12 gap-2 border-0 border-[red]">
											<div className={`col-span-3 h-2 rounded-xl ${field.value === '' ? 'hidden' : 'bg-[green]'}`}></div>
											<div className={`col-span-3 h-2 rounded-xl ${field.value === '' ? 'hidden' : 'bg-[green]'}`}></div>
											<div className={`col-span-3 h-2 rounded-xl ${field.value === '' ? 'hidden' : 'bg-[green]'}`}></div>
											<div className={`col-span-3 h-2 rounded-xl ${field.value === '' ? 'hidden' : 'bg-[green]'}`}></div>
										</div>
									</>
								)}

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
					<Button type="submit" variant="contained" colors="primary" ripple>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default App;
