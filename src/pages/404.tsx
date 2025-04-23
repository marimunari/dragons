// system
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

// contexts
import { useAuth } from "@/src/@core/contexts/Auth/AuthContext";

// internal components
import Button from '@/src/components/Button/Button';
import Loading from "@/src/components/Loading/Loading";

// internal images
import SleepDragon from '@/src/assets/images/sleep-dragon-image.png';

// styles
import styles from './styles/NotFound.module.scss'

export default function NotFound() {
  const [loading, setLoading] = useState<boolean>(true);
  
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className={styles.container}>
      <Image src={SleepDragon} alt="Dragon Logo" width={80} height={80} />
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Página não encontrada</h2>
      <p className={styles.description}>A página que você está procurando não existe.</p>
      <Button variant="text" text="Voltar para a Home" color="blue" onClick={() => router.push('/')} />
    </section>
  );
}
