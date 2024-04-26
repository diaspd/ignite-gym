import { Skeleton } from "native-base";

import { PHOTO_SIZE } from "@screens/Profile";

export function ProfileSkeleton() {
  return (
    <>
      <Skeleton 
        w={PHOTO_SIZE} 
        h={PHOTO_SIZE} 
        rounded="full" 
        startColor="gray.500"
        endColor="gray.400"
      />
    </>
  )
}