'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = '/admin/dashboard';
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg">
      {/* Visual background flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-accent/10 p-3 rounded-2xl text-accent border border-accent/15 mb-2 animate-float">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="stat-value uppercase">Administrator Login</h1>
          <p className="text-xs text-text-secondary">Access your AICTE-KEC Idea Lab resource managers</p>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            {[
              { src: '/AICTE.png', alt: 'AICTE' },
              { src: '/KEC_new2.png', alt: 'KEC' },
              { src: '/IDEALab.png', alt: 'IDEA Lab' },
              { src: '/IIC.png', alt: 'IIC' },
              { src: '/EMDC.png', alt: 'EMDC' },
              { src: '/TBI.png', alt: 'TBI' },
            ].map((logo) => (
              <div key={logo.alt} className="relative h-12 w-auto opacity-65">
                <img src={logo.src} alt={logo.alt} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8 shadow-2xl shadow-accent/10">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-accent-2/10 border border-accent-2/20 text-accent-2 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-text-secondary">
                Administrator Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kec.ac.in"
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/10"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-text-secondary">
                Security Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-lg focus:shadow-accent/10"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={loading} className="gap-2">
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Panel <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick instructions to help developers login on development server */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <span className="label text-text-secondary font-bold block mb-1">Dev Credentials Guide</span>
            <p className="text-[10px] text-text-secondary leading-relaxed">
              Default credentials can be configured inside `.env.local` using `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH_B64` (base64-encoded bcrypt hash).
            </p>
          </div>
        </Card>

        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-xs text-text-secondary hover:text-text inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Public Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

