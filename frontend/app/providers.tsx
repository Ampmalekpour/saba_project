"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#22c55e",
            colorBgContainer: "#161b29",
            colorBgLayout: "#0f1420",
            colorBorder: "#232a3b",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  );
}
