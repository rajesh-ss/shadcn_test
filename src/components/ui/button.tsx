import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5 py-3',
	{
		variants: {
			variant: {
				default: ' shadow ',
				text: 'border-0 bg-transparent px-4 py-2',
				outline: 'border-[.3rem] bg-[#fff] shadow-sm rounded-lg px-4 py-2',
				contained: 'shadow-sm rounded-lg',
			},
			colors: {
				primary: 'border-btn-primary text-btn-primary-foreground bg-btn-primary hover:bg-btn-primary',
				success: 'border-btn-success text-btn-success-foreground bg-btn-success hover:bg-btn-success-dim',
				danger: 'border-btn-danger text-btn-danger-foreground bg-btn-danger hover:bg-btn-danger-dim',
				secondary: 'border-btn-secondary text-btn-secondary-foreground bg-btn-secondary',
			},
			ripple: {
				true: 'relative overflow-hidden tracking-wider',
				false: '',
			},
			rippleRadius: {},
		},
		compoundVariants: [
			{
				variant: 'outline',
				colors: 'primary',
				class: 'border-btn-primary text-btn-primary bg-[#fff]',
			},
			{
				variant: 'outline',
				colors: 'success',
				class: 'border-btn-success text-btn-success bg-[#fff]',
			},
			{
				variant: 'outline',
				colors: 'primary',
				class: 'border-btn-primary text-btn-primary bg-[#fff]',
			},
			{
				variant: 'contained',
				colors: 'primary',
				class: 'border-btn-primary text-btn-primary-foreground bg-btn-primary',
			},
			{
				variant: 'text',
				colors: 'primary',
				class: 'text-btn-primary bg-white border-0 hover:bg-opacity-200',
			},
		],

		defaultVariants: {
			variant: 'default',
			ripple: false,
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ colors, className, variant, ripple = false, asChild = false, onClick, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';

	const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (ripple) {
			const x = e.clientX - e.currentTarget.offsetLeft;
			const y = e.clientY - e.currentTarget.offsetTop;
			const ripples = document.createElement('span');
			ripples.className = 'absolute bg-[#fff] -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple';
			ripples.style.left = `${x}px`;
			ripples.style.top = `${y}px`;
			e.currentTarget.appendChild(ripples);
			setTimeout(() => ripples.remove(), 1000);
		}

		console.log(ripple);

		if (onClick) {
			console.log('real inside');
			onClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
		}
	};

	return <Comp onClick={handleClick} className={cn(buttonVariants({ variant, className, colors, ripple }))} ref={ref} {...props}></Comp>;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
