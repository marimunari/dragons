// system
import React, { useState } from "react";
import { useRouter } from 'next/router';

// contexts
import { useAuth } from '@/src/@core/contexts/Auth/AuthContext';

// components
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";

// styles
import styles from './index.module.scss';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await login(email, password);

    if (response) {
      router.push('/');
    } else {
      setError('Credenciais inválidas.');
    }

    setLoading(false);
  };

  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <Input
              label="E-mail"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              label="Senha"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.formButton}>
            <Button
              variant="text"
              color="blue"
              text={loading ? "Carregando..." : "Entrar"}
              htmlType="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </section>
  );
};