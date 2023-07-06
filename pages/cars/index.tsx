import { CarItemSpecification } from '@/components/CarItemSpecification';
import { SearchForm } from '@/components/SearchForm';
import { ICar, getAll } from '@/services/data';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiClock, FiMapPin, FiTool } from 'react-icons/fi';

type Props = {
  cars: ICar[];
};

// SERVER SIDE
export const getStaticProps: GetStaticProps<Props> = async () => {
  const allCars = await getAll();

  return {
    props: {
      cars: allCars ?? [],
    },
    revalidate: 5 * 1000,
  };
};

// CLIENT SIDE

type ListProps = InferGetServerSidePropsType<typeof getStaticProps>;

const List = ({ cars: carsInitial }: ListProps) => {
  const router = useRouter();
  const [cars, setCars] = useState(carsInitial);

  if (router.isFallback) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div className="w-full flex justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full m-4 md:w-2/3 xl:w-1/2">
        <SearchForm
          onSubmit={async (term) => {
            const request = await fetch(`/api/cars?search=${term}`);
            const data = await request.json();
            setCars(data);
          }}
        />
        <h2 className="text-3xl font-medium my-4 text-gray-800">
          Itens recomendados
        </h2>

        {cars.length === 0 && (
          <h2 className="text-2xl font-medium my-4 text-gray-800">
            Ops, não há itens disponíveis
          </h2>
        )}

        {cars.map((car) => (
          <div
            key={car.id}
            className="w-full shadow p-3 mb-5 rounded hover:shadow-xl transition ease-out duration-1000"
          >
            <div className="relative w-fullh h-96 ">
              <Image
                src={car.image}
                alt={car.make}
                fill
                className="rounded object-cover"
              />
            </div>
            <Link
              href={`/cars/detail/${car.id}`}
              className="text-gray-800 pt-3 text-lg"
            >
              {car.make} {car.model}
            </Link>

            <p className="font-bold text-gray-800 py-3 text-lg">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(car.price)}
            </p>

            <div className="flex justify-between">
              <CarItemSpecification icon={<FiTool />} text={car.fuel} />
              <CarItemSpecification icon={<FiClock />} text={car.year} />
              <CarItemSpecification
                icon={<FiMapPin />}
                text={car.mileage.toString()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
