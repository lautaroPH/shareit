import { useState } from 'react';
import { loginWithGithub } from 'firebaseMain/firebaseFunction';
import { useRouter } from 'next/router';

const Button = ({ firstIcon, secondIcon }) => {
  const [githubHoverIcon, setGithubHoverIcon] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    loginWithGithub().then(() => {
      router.push('/inicio');
    });
  };
  return (
    <button
      className="flex items-center justify-center buttonsIndex hover:bg-violet-800  hover:text-white
         dark:hover:bg-white text-violet-800 dark:hover:text-[#282C34] dark:text-white w-4/5 sm:w-[45%] mb-4 sm:mb-0"
      onClick={handleClick}
      onMouseOver={() => setGithubHoverIcon(true)}
      onMouseLeave={() => setGithubHoverIcon(false)}
    >
      {!githubHoverIcon ? firstIcon : secondIcon}
      Ingresar con Github
    </button>
  );
};

export default Button;
