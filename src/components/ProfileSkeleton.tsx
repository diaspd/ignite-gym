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

      <Skeleton 
        w={20}
        h={4}
        mt={4} 
        mb={8}
        startColor="gray.500"
        endColor="gray.400"
        rounded="md"
      />

      <Skeleton 
        w={342}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />

      <Skeleton 
        w={342}
        mt={3}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />

      <Skeleton 
        w={24}
        h={6}
        mt={16} 
        startColor="gray.500"
        endColor="gray.400"
        rounded="md"
        ml={-56}
        mr={6} 
      />
      
      <Skeleton 
        w={342}
        mt={3}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />

      <Skeleton 
        w={342}
        mt={3}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />

      <Skeleton 
        w={342}
        mt={3}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />

      <Skeleton 
        w={342}
        mt={8}
        h={14}
        startColor="gray.500"
        endColor="gray.400"
        rounded="sm"
      />
    </>
  )
}