import useUser from 'hooks/useUser';
import AsideActivityComments from './AsideActivityComments';
import AsideActivityLikes from './AsideActivityLikes';

const AsideActivity = () => {
  const user = useUser();
  return (
    <>
      {user && (
        <div className="flex justify-end mt-2 ">
          <div className="flex flex-col rounded-xl bg-white dark:bg-gray-900 w-[90%] xl:w-[80%] justify-center items-center px-2">
            <AsideActivityComments />
            <AsideActivityLikes />
          </div>
        </div>
      )}
    </>
  );
};

export default AsideActivity;
