import './styles.css';

export const metadata = {
  title: 'Veriforge',
  description: 'Where my work becomes proof.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
