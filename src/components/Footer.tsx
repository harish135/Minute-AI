export default function Footer() {
  return (
    <>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-0" />
      <footer className="text-center p-8 text-base text-gray-600 bg-white/60 backdrop-blur-md shadow-inner animate-fade-in">
        © {new Date().getFullYear()} AI Meeting Assistant. All rights reserved.
      </footer>
    </>
  )
}
  