import {
  CarItemSpecification,
  CarItemTextSpecification,
} from '@/components/CarItemSpecification';
import { ICar, getTop10, getbyId } from '@/services/data';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiMapPin, FiTool } from 'react-icons/fi';

type Props = {
  car: ICar;
};

export const getStaticPaths = async () => {
  const data = await getTop10();

  const paths = data.map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

// temp
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
};

// SERVER SIDE
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }

  const car = await getbyId(context.params?.id as string);

  await sleep();

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      car,
    },
    revalidate: 5 * 1000,
  };
};

// CLIENT SIDE

type DetailProps = InferGetServerSidePropsType<typeof getStaticProps>;

const Detail = ({ car }: DetailProps) => {
  return (
    <div className="w-full flex justify-center bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full m-4 md:w-2/3 xl:w-1/2">
        <div className="flex m-2">
          <div className="flex text-gray-800 font-semibold items-center py-2 px-4 hover:bg-gray-200 rounded">
            <FiArrowLeft className="mr-2" size={24} />
            <Link href="/cars">Voltar</Link>
          </div>
        </div>

        <div key={car.id} className="w-full shadow p-3 mb-5 rounded">
          <div className="relative w-fullh h-96 ">
            <Image
              src={car.image}
              alt={car.make}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="text-gray-800 pt-3 text-lg">
            {car.make} {car.model}
          </p>

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

          <CarItemTextSpecification text={car.description} />
          <CarItemTextSpecification text={`Condition: ${car.condition}`} />
          <CarItemTextSpecification text={`City: ${car.location}`} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
