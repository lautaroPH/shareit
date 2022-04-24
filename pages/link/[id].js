import Header from 'components/Header/Header';
import Linklist from 'components/Home/Main/Link';
import { useState } from 'react';
export default function Link({ data, dataLink }) {
  const [link, setlink] = useState(dataLink);

  return (
    <div>
      <Header
        title="Ranking"
        description="Ranking para saber quien ha realizada la gran mayoria 
        de pajas a lo largo del tiempo, para descubrir quien es el más pajero"
        data={data}
      />

      <div className="flex items-center justify-center mt-7">
        <div className="mb-20 border-t border-gray-300 sm:border-none">
          <Linklist
            id={link?.id}
            key={link?.id}
            title={link?.title}
            link={link?.link}
            description={link?.description}
            email={link?.email}
            userId={link?.userId}
            username={link?.username}
            githubRepo={link?.githubRepo}
            tecnologies={link?.tecnologies}
            image={link?.image}
            avatar={link?.userImage}
            timestamp={link?.timestamp}
            isEdited={link?.isEdited}
            isOneLink={true}
            openComment={true}
            links={link}
            setLinks={setlink}
          />{' '}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/links');
  const links = await res.json();

  const paths = links.map((link) => ({
    params: { id: link.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/link/${id}`);
  const dataLink = await res.json();

  const data = {
    title: 'TITULO A VER',
    inicio: 'Inicio',
    ranking: 'Ranking',
    misProyectos: 'Mis proyectos',
  };

  return {
    props: {
      data,
      dataLink,
    },
  };
}