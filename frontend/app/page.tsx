import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === 'admin') {
      redirect('/admin/dashboard');
    } else {
      redirect('/user/home');
    }
  }

  redirect('/login');
}