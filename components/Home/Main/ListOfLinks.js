import { useEffect, useState, useContext, useRef } from "react";
import Link from "./Link";
import ButtonOpenModalForm from "./Buttons/ButtonOpenModalForm";
import useUser from "hooks/useUser";
import SkeletonLoaderLink from "components/Loaders/SkeletonLoaderLink";
import { getLinks } from "firebaseFunction/getLinks";
import OrderByLinks from "./OrderByLinks";
import { OrderByValue } from "context/OrderByContext";
import useNearScreen from "hooks/useNearScreen";
import { getMoreLinks } from "firebaseFunction/getMoreLinks";

const ListOfLinks = () => {
  const [links, setLinks] = useState([]);
  const [noLinks, setNoLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoreLinks, setIsLoadingMoreLinks] = useState(false);

  const user = useUser();
  const { value } = useContext(OrderByValue);
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: !links ? null : externalRef,
    once: false,
  });

  useEffect(() => getLinks(setNoLinks, setLinks, value, setIsLoading), [value]);

  useEffect(() => {
    if (isNearScreen && !noLinks && !isLoadingMoreLinks) {
      const lastVisible = links[links.length - 1];
      getMoreLinks(
        setNoLinks,
        setLinks,
        value,
        setIsLoadingMoreLinks,
        lastVisible
      );
    }
  }, [isNearScreen, value, links, noLinks, isLoadingMoreLinks]);

  return (
    <>
      {/* {user && <ButtonOpenModalForm />}
      <OrderByLinks /> */}
      <h3 className="text-center text-gray-500 -mt-4 mb-3">
        Resultados de tu busqueda
      </h3>
      {isLoading ? (
        <>
          <SkeletonLoaderLink />
          <SkeletonLoaderLink />
        </>
      ) : (
        <>
          <div className="mb-20 border-t border-gray-300 sm:border-none">
            {links.map((link) => (
              <Link
                id={link?.id}
                key={link?.id}
                title={link?.data()?.title}
                link={link?.data()?.link}
                description={link?.data()?.description}
                email={link?.data()?.email}
                userId={link?.data()?.id}
                username={link?.data()?.username}
                githubRepo={link?.data()?.githubRepo}
                tecnologies={link?.data()?.tecnologies}
                image={link?.data()?.image}
                avatar={link?.data()?.userImage}
                timestamp={link?.data()?.timestamp}
                isEdited={link?.data()?.isEdited}
                setLinks={setLinks}
                links={links}
              />
            ))}
            {isLoadingMoreLinks && !noLinks && <SkeletonLoaderLink />}
          </div>
          <div id="visor" ref={externalRef}></div>
        </>
      )}
    </>
  );
};

export default ListOfLinks;
