import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/templates/AuthLayout'
import { AuthTerminal } from '@/organisms/AuthTerminal'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <AuthTerminal onSuccess={() => navigate('/dashboard')} />
      <p className="text-center text-terminal-muted text-xs mt-4 font-mono">
        No account?{' '}
        <Link to="/register" className="text-terminal-cyan hover:underline">register</Link>
      </p>
    </AuthLayout>
  )
}
