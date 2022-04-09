import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { deleteLike } from 'firebaseFunction/deleteLike';
import { uploadLike } from 'firebaseFunction/uploadLike';
import { useTheme } from 'next-themes';

const LikeButton = ({ id, likes, dataUserLike, links, setLinks }) => {
  const [hasLiked, setHasLiked] = useState(false);

  const user = useUser();
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(
    () => setHasLiked(likes?.findIndex((like) => like.id === user?.id) !== -1),
    [likes, user]
  );

  const likeLink = async () => {
    if (hasLiked) {
      await deleteLike(id, user?.id);
    } else {
      await uploadLike(id, user, dataUserLike, links, setLinks, currentTheme);
    }
  };

  return (
    <button
      onClick={user && likeLink}
      className="flex text-purple-700 transition-colors 
         mr-3 ease-in duration-300 hover:text-purple-800 cursor-pointer
         dark:text-white dark:hover:bg-[#282C34] hover:bg-gray-200 p-2 rounded "
    >
      {hasLiked ? (
        <HeartIconFilled className="h-6 mr-1" />
      ) : (
        <HeartIcon className="h-6 mr-1" />
      )}
      <span className="hidden sm:block">Me gusta</span>
    </button>
  );
};

export default LikeButton;
