"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const TopRatedGames = () => {
  const queryClient = useQueryClient();

  const topRatedGamesMutation = useMutation({
    mutationKey: ["topRatedGames"],
    mutationFn: async () => {
      await axiosInstance.put(`/api/v1/games/top-rated`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions-dashboard"] });
    },
  });

  return <div>{topRatedGamesMutation.isPending ? <>Loading...</> : <></>}</div>;
};
