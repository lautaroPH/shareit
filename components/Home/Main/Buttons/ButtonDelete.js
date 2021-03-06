import { deleteLink } from 'firebaseFunction/deleteLink';
import { useTheme } from 'next-themes';
import { swalConfirmDeleteDark } from 'swals/dark/swalConfirmDeleteDark';
import { swalDeleteLoadingDark } from 'swals/dark/swalDeleteLoadingDark';
import { swalDeleteSucessDark } from 'swals/dark/swalDeleteSucessDark';
import { swalConfirmDeleteLight } from 'swals/light/swalConfirmDeleteLight';
import { swalDeleteLoadingLight } from 'swals/light/swalDeleteLoadingLight';
import { swalDeleteSuccessLight } from 'swals/light/swalDeleteSuccessLight';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const ButtonDelete = ({
  id,
  image,
  userId,
  setLinks,
  links,
  isOneLink,
  isUser,
}) => {
  const router = useRouter();
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (id, image) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingDark);
          deleteLink(
            id,
            image,
            userId,
            setLinks,
            links,
            isOneLink,
            isUser
          ).then(() => {
            if (isOneLink) {
              router.push('/');
            }
            Swal.fire(swalDeleteSucessDark);
          });
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingLight);
          deleteLink(
            id,
            image,
            userId,
            setLinks,
            links,
            isOneLink,
            isUser
          ).then(() => {
            if (isOneLink) {
              router.push('/');
            }
            Swal.fire(swalDeleteSuccessLight);
          });
        }
      });
    }
  };

  return (
    <button
      className="p-1 text-sm md:text-base text-red-500 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-red-700 dark:hover:text-red-400 hover:border-red-600"
      onClick={() => handleClick(id, image)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
