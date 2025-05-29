'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VacancyPageById from '@/components/Vacancy/VacancyPageById/VacancyPageById';

interface Vacancy {
  _id: string;
  title: string;
  // Добавь другие поля при необходимости
}

const VacancyPage = () => {
  const rawParams = useParams(); 
  const params = rawParams; // Используем rawParams напрямую

  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchVacancy = async () => {
      try {
        const res = await fetch(`/api/vacancy/${params.id}`);
        if (!res.ok) throw new Error('Ошибка при получении данных');

        const data = await res.json();
        setVacancy(data);
      } catch (err: any) {
        setError(err.message || 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [params?.id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!vacancy) return <div>Вакансия не найдена</div>;

  return (
   <VacancyPageById vacancy={vacancy} /> // Передаем данные вакансии в компонент
  );
};

export default VacancyPage;
