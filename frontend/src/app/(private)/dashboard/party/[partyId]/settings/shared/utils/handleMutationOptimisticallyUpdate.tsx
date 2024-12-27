import { QueryClient } from "@tanstack/react-query";

export const handleMutationOptimisticallyUpdate = <
  T extends Record<string, any>
>(
  queryClient: QueryClient,
  queryKey: string[],
  updater: (oldData: T | undefined) => T | undefined
): T | undefined => {
  const previousData = queryClient.getQueryData<T>(queryKey);

  queryClient.setQueryData(queryKey, updater);

  return previousData;
};
