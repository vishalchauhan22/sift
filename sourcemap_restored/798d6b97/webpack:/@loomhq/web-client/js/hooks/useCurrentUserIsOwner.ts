import { useGetIsUserVideoOwnerQuery } from './GetIsUserVideoOwner.generated';

export const useCurrentUserIsOwner = ({
  videoId,
}: {
  videoId: string | null;
}): boolean => {
  const { data } = useGetIsUserVideoOwnerQuery({
    variables: {
      id: videoId as string,
    },
    skip: !videoId,
  });

  return data?.getVideo?.__typename === 'RegularUserVideo'
    ? data.getVideo.current_user_is_owner
    : false;
};
