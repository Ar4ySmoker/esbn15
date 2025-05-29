'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import VacancyCard from '@/components/Vacancy/VacancyCard/VacancyCard';
import { useVacancies } from '@/context/VacancyContext'; 
import { VacancyType } from '@/lib/types/vacancy'; 
import FormCallBack from '@/components/FormCallBack/FormCallBack';
import Userfull from '@/components/Userfull/Userfull';

export default function VacancyList() {
  const { vacancies, loadVacancies } = useVacancies(); // Извлекаем данные и функцию из контекста
  const params = useParams();
  
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type || 'all';

  useEffect(() => {
    if (!vacancies[type]) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/vacancy/all?type=${type}`);
          if (!response.ok) throw new Error('Не удалось загрузить вакансии');

          const data = await response.json();
          loadVacancies(type, data); // Загружаем вакансии в контекст
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [type, vacancies, loadVacancies]);

  const translateType = (type: string) => {
    switch (type) {
      case 'all':
        return 'Все вакансии';
      case 'new':
        return 'Новые вакансии';
      case 'indor':
        return 'Внутреняя отделка';
      case 'outdor':
        return 'Уличные работы';
      case 'electric':
        return 'Электрика';
      case 'sanitary':
        return 'Сантехника';
      default:
        return 'Неизвестный тип';
    }
  };

  const vacanciesArray = vacancies[type] as VacancyType[]; 

  return (
    <>
      <h1 className="text-center text-3xl font-bold">{translateType(type)}</h1>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
        {vacanciesArray?.map((vacancy: VacancyType) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} />
        ))}
      </div>
      <FormCallBack/>
      <Userfull/>
    </>
  );
}
