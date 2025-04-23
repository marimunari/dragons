// system
import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

// internal components
import Button from '@/src/components/Button/Button';

// internal images
import SleepDragon from '@/src/assets/images/sleep-dragon-image.png';

// styles
import styles from './styles/NotFound.module.scss'

export default function NotFound() {
  const router = useRouter();

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
