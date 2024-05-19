import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '../styles/global.scss';

const roboto = Roboto({
	subsets: ['cyrillic', 'latin'],
	style: ['normal', 'italic'],
	weight: ['400', '700']
});

export const metadata: Metadata = {
	title: 'dadata-next-app',
	description: 'next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={roboto.className}>
				<div className='container'>{children}</div>
			</body>
		</html>
	);
}
