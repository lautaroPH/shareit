import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useState } from 'react';
import AnswersList from './AnswersList';
import ButtonDeleteComment from '../Buttons/ButtonDeleteComment';
import { ButtonEditComment } from '../Buttons/ButtonEditComment';
import FormComment from '../Forms/FormComment';
import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Comment = ({
  commentId,
  linkId,
  avatar,
  comment,
  timestamp,
  userId,
  username,
  isEdited,
  comments,
  setComments,
  commentsNumber,
  links,
  setLinks,
  setCommentsNumber,
  isOneLink,
}) => {
  const user = useUser();
  const [openAllComment, setOpenAllComment] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);

  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );

  return (
    <>
      <div className="px-4 pb-1">
        <div className="flex justify-center">
          <div className="mt-2 mr-2 w-11 h-11">
            <Image
              className="rounded-full"
              src={avatar}
              height={150}
              width={150}
              alt={comment}
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 w-[90%] rounded-lg p-2 relative">
            <div className="flex justify-between">
              <div>
                <Link href={`/usuario/${userId}`}>
                  <a>
                    <p className="mr-2 font-semibold hover:underline">
                      {username}
                    </p>
                  </a>
                </Link>
                <p className="mb-1 text-xs font-light dark:text-gray-300 sm:text-sm">
                  <time title={createdAtFormated}>{timeago}</time>
                  {isEdited && <span className="ml-1">• Editado •</span>}
                </p>
              </div>
              {userId === user?.id && !openEditComment && (
                <p className="-mt-1">
                  <ButtonEditComment setOpenEditComment={setOpenEditComment} />
                  <ButtonDeleteComment
                    commentId={commentId}
                    linkId={linkId}
                    userId={user?.id}
                    comments={comments}
                    setComments={setComments}
                    commentsNumber={commentsNumber}
                    setCommentsNumber={setCommentsNumber}
                  />
                </p>
              )}
              {openEditComment && (
                <XIcon
                  className="w-6 h-6 pr-1 text-gray-400 cursor-pointer"
                  onClick={() => setOpenEditComment(false)}
                />
              )}
            </div>
            {!openEditComment ? (
              <p className="overflow-hidden text-sm">
                {comment.substring(0, 260)}
                {comment.length > 240 && !openAllComment && (
                  <button
                    onClick={() => setOpenAllComment(true)}
                    className="pl-1 text-sm transition-all duration-150 ease-in text-violet-600 dark:text-gray-300 hover:text-violet-700 dark:hover:text-gray-400 hover:underline"
                  >
                    ...ver más
                  </button>
                )}
                {openAllComment && <>{comment.substring(260, 1250)}</>}
              </p>
            ) : (
              <FormComment
                setOpenEditComment={setOpenEditComment}
                comment={comment}
                linkId={linkId}
                commentId={commentId}
                isEditing={true}
                userId={userId}
                comments={comments}
                setComments={setComments}
                links={links}
                setLinks={setLinks}
                setCommentsNumber={setCommentsNumber}
                isOneLink={isOneLink}
              />
            )}
          </div>
        </div>
        <AnswersList
          linkId={linkId}
          commentId={commentId}
          comments={comments}
          setComments={setComments}
          setCommentsNumber={setCommentsNumber}
        />
      </div>
    </>
  );
};

export default Comment;
