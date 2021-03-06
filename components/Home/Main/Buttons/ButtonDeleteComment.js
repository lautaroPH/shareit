import { deleteComment } from 'firebaseFunction/deleteComment';
import { useTheme } from 'next-themes';
import { swalConfirmDeleteCommentDark } from 'swals/dark/swalConfirmDeleteCommentDark';
import { swalDeleteLoadingCommentDark } from 'swals/dark/swalDeleteLoadingCommentDark';
import { swalDeleteSucessCommentDark } from 'swals/dark/swalDeleteSucessCommentDark';
import { swalConfirmDeleteCommentLight } from 'swals/light/swalConfirmDeleteCommentLight';
import { swalDeleteLoadingCommentLight } from 'swals/light/swalDeleteLoadingCommentLight';
import { swalDeleteSuccessCommentLight } from 'swals/light/swalDeleteSuccessCommentLight';
import Swal from 'sweetalert2';

const ButtonDeleteComment = ({
  linkId,
  commentId,
  userId,
  comments,
  setComments,
  commentsNumber,
  setCommentsNumber,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleClick = async (linkId, commentId) => {
    if (currentTheme === 'dark') {
      Swal.fire(swalConfirmDeleteCommentDark).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentDark);
          deleteComment(linkId, commentId, userId, setComments, comments).then(
            () => {
              setCommentsNumber(commentsNumber - 1);
              Swal.fire(swalDeleteSucessCommentDark);
            }
          );
        }
      });
    } else {
      Swal.fire(swalConfirmDeleteCommentLight).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Swal.fire(swalDeleteLoadingCommentLight);
          deleteComment(
            linkId,
            commentId,
            userId,
            setComments,
            comments,
            commentsNumber
          ).then(() => {
            setCommentsNumber(commentsNumber - 1);

            Swal.fire(swalDeleteSuccessCommentLight);
          });
        }
      });
    }
  };

  return (
    <button
      className="p-1 text-xs md:text-sm text-red-500 transition-colors duration-300 ease-out border-2 border-transparent rounded-lg hover:text-red-700 dark:hover:text-red-400 hover:border-red-600"
      onClick={() => handleClick(linkId, commentId)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteComment;
