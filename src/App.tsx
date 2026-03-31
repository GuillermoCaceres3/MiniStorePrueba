import Navbar from './components/Navbar'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main>
        <AppRouter />
      </main>
    </div>
  )
}

export default App