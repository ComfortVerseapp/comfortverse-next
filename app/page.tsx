import SubscribeForm from './SubscribeForm';
import Image from 'next/image'

export default function Page() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}
    >
      {/* Logo */}
      <Image 
        src="/logo.png"   // Make sure logo.png is inside the "public" folder
        alt="ComfortVerse Logo"
        width={200}
        height={200}
      />

      {/* Text */}
      <h1 style={{ color: '#6FABDC' }}>ComfortVerse</h1>
      <h2 style={{ color: '#F1C40F' }}>Coming Soon</h2>
      <p>Scripture for every season of the soul.</p>
    </main>
  )
}
