// system
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// models
import { DragonModel } from "@/src/@core/interfaces/Dragon/dragon.interface";
import { DragonStats } from "@/src/@core/models/Dragon/dragon.model";

// services
import { getAllDragons } from "@/src/@core/services/dragon/dragonService";

// contexts
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";
import { useAuth } from "../@core/contexts/Auth/AuthContext";

// utils
import { formatIsoToDateTime } from "@/src/@core/utils/date/date.utils";

// internal components
import Button from "@/src/components/Button/Button";
import Loading from "../components/Loading/Loading";

// external icons
import { FaDragon, FaList, FaPlus, FaFire, FaCircle } from "react-icons/fa6";

// styles
import styles from './styles/home.module.scss';

export default function Home() {
  const [dragons, setDragons] = useState<DragonModel[]>([]);
  const [stats, setStats] = useState<DragonStats>({
    totalByType: {},
    createdThisMonth: 0,
    lastCreated: null,
  });

  const [loading, setLoading] = useState(true);

  const typeColors = [
    "#38bdf8",
    "#f87171",
    "#4ade80",
    "#facc15",
    "#c084fc",
    "#f97316",
  ];

  const router = useRouter();

  const { addToast } = useToaster();

  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    getDragons();
  }, []);

  /**
   * Method responsible for fetching the dragon data and setting the stats
   * @returns {Promise<void>}
   */
  async function getDragons(): Promise<void> {
    try {
      const data = await getAllDragons();
      setDragons(data);
      setStats(computeDragonStats(data));
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Erro ao buscar dragões",
        description: "Não foi possível carregar os dragões. Tente novamente mais tarde.",
      });
    }
  }

  /**
   * Method responsible for computing stats for dragons
   * @param {Dragon[]} data
   * @returns {DragonStats}
   */
  function computeDragonStats(data: DragonModel[]): DragonStats {
    const totalByType: Record<string, number> = {};

    data.forEach((dragon) => {
      const type = dragon.type || "Desconhecido";
      totalByType[type] = (totalByType[type] || 0) + 1;
    });

    const sortedDragons = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const lastCreated = sortedDragons[0] || null;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const createdThisMonth = data.filter(
      (dragon) =>
        new Date(dragon.createdAt).getMonth() === currentMonth &&
        new Date(dragon.createdAt).getFullYear() === currentYear
    ).length;

    return { totalByType, createdThisMonth, lastCreated };
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className={styles.home}>
      <div className={styles.home__header}>
        <h1 className={styles.home__title}>Olá, {user?.userName}! 🐉</h1>
        <p className={styles.home__subtitle}>
          Bem-vindo(a) ao Sistema de Gerenciamento de Dragões.
        </p>
      </div>

      <div className={styles.home__highlights}>
        <div className={`${styles.card} ${styles["card--blue"]}`}>
          <FaDragon size={30} className={styles.card__icon} />
          <div>
            <p className={styles.card__label}>Total de Dragões</p>
            <p className={styles.card__value}>{dragons.length}</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles["card--green"]}`}>
          <FaFire size={30} className={styles.card__icon} />
          <div>
            <p className={styles.card__label}>Criados este mês</p>
            <p className={styles.card__value}>{stats.createdThisMonth}</p>
          </div>
        </div>
      </div>

      <div className={styles.home__types}>
        <h2 className={styles.home__sectionTitle}>Tipos de Dragões</h2>
        <div className={styles.home__typesList}>
          {Object.entries(stats.totalByType).map(([type, count], index) => (
            <div key={type} className={styles.typeCard}>
              <FaCircle
                color={typeColors[index % typeColors.length]}
                size={12}
              />
              <div>
                <p className={styles.typeCard__title}>{type}</p>
                <p className={styles.typeCard__count}>
                  {count} {count > 1 ? "dragões" : "dragão"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {stats.lastCreated && (
        <div className={styles.home__lastDragon}>
          <h2 className={styles.home__sectionTitle}>
            Último dragão cadastrado
          </h2>
          <div className={styles.lastDragonCard}>
            <p className={styles.lastDragonCard__name}>
              {stats.lastCreated.name}
            </p>
            <p className={styles.lastDragonCard__details}>
              Tipo: {stats.lastCreated.type} — Cadastrado em:{" "}
              {formatIsoToDateTime(stats.lastCreated.createdAt)}
            </p>
          </div>
        </div>
      )}

      <div className={styles.home__actions}>
        <Button
          variant="iconText"
          color="green"
          icon={<FaPlus />}
          text="Cadastrar dragão"
          onClick={() => router.push("/dragons/register")}
        />
        <Button
          variant="iconText"
          color="blue"
          icon={<FaList />}
          text="Visualizar lista de dragões"
          onClick={() => router.push("/dragons/list")}
        />
      </div>
    </section>
  );
}
