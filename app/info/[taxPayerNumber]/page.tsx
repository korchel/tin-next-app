import Link from "next/link";

import SearchField from "../../../components/SearchField/SearchField";
import styles from './page.module.scss';
import Modal from '../../../components/Modal/Modal';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getData = async (taxPayerNumber: string) => {
  let isError = false;
  try {
    const response = await fetch("http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + API_KEY,
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        query: taxPayerNumber,
        type: "LEGAL",
        branch_type: "MAIN",
      }),
    });
    const data = await response.json();
    return [data.suggestions[0], isError];
  } catch (error) {
    isError = true;
    return [null, isError];
  }
};

const InfoPage = async ({ params }: { params: { taxPayerNumber: string } }) => {
  const [info, isError] = await getData(params.taxPayerNumber);

  return (
    <>
      <SearchField />
      {!info && !isError && <h2>Ничего не найдено</h2>}
      {isError && <h2>Произошла ошибка</h2>}
      {info &&
        <>
          <div className={styles.infoContainer}>
            <h1>{info.value}</h1>
            <p>{`КПП: ${info.data.kpp}`}</p>
            <p>{`${info.data.management.post}: ${info.data.management.name}`}</p>
            <p>Адрес: <Link href={`/info/${params.taxPayerNumber}?showModal=yes`}>{info.data.address.value}</Link></p>
          </div>
          <Modal address={info.data.address.value} taxPayerNumber={params.taxPayerNumber} />
        </>
      }
    </>
  );
};

export default InfoPage;