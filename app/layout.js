import './globals.css';

export const metadata = {
  title: 'Alex Morgan — Independent developer',
  description: 'Selected work and notes from Alex Morgan, an independent product developer.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
