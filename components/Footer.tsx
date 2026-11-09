export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 px-4 py-8 text-center text-sm text-gray-400">
      <p>Made in India 🇮🇳</p>
      <p className="mt-1 text-xs text-gray-500">© {new Date().getFullYear()} MiniArcade. All rights reserved.</p>
    </footer>
  );
}
