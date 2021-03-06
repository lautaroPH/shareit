import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteCommentCollection } from './deleteCommentCollection';
import { deleteCommentNumbers } from './deleteCommentsNumber';
import { deleteImageStorage } from './deleteImageStorage';
import { deleteLikesCollection } from './deleteLikesCollection';
import { deleteOneLinkNumberForUser } from './deleteOneLinkNumberForUser';
import { deleteUserCommentCollection } from './deleteUserCommentCollection';
import { deleteUserLikesCollection } from './deleteUserLikesCollection';

export const deleteLink = async (
  id,
  image,
  userId,
  setLinks,
  links,
  isOneLink,
  isUser
) => {
  await deleteDoc(doc(db, 'links', id));

  if (image) {
    await deleteImageStorage(id);
  }
  if (!isOneLink && !isUser) {
    const newLinks = links.filter((link) => link.id !== id);
    setLinks(newLinks);
  }

  await deleteOneLinkNumberForUser(userId);
  await deleteCommentNumbers(id);
  await deleteLikesCollection(id);
  await deleteCommentCollection(id);
  await deleteUserCommentCollection(userId, id);
  await deleteUserLikesCollection(userId, id);
};
