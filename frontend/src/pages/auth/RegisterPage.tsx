import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { AuthLayout } from '@/templates/AuthLayout'
import { Input } from '@/atoms/Input'
import { Button } from '@/atoms/Button'

const schema = z.object({
  displayName:   z.string().min(2),
  email:         z.string().email(),
  password:      z.string().min(6),
  affiliateCode: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
    await updateProfile(user, { displayName: data.displayName })
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="bg-terminal-secondary border border-terminal-border p-6 space-y-4">
        <div className="pane-title -mx-6 -mt-6 mb-4 px-4 text-xs">gsm-tools ~ register</div>
        <Input label="display name" prefix=">" error={errors.displayName?.message} {...register('displayName')} />
        <Input label="email"        prefix=">" error={errors.email?.message}       {...register('email')} type="email" />
        <Input label="password"     prefix=">" error={errors.password?.message}    {...register('password')} type="password" />
        <Input label="affiliate code (optional)" prefix=">" {...register('affiliateCode')} />
        <Button className="w-full justify-center" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          CREATE ACCOUNT
        </Button>
        <p className="text-terminal-muted text-xs text-center">
          Already registered? <Link to="/login" className="text-terminal-cyan">login</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
