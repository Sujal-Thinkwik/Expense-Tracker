
import React from "react";
import { Center, Card, Box } from "@mantine/core";
import Logo from "@/components/common/Logo";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      pos="relative"
      mih="100vh"
      style={{
        overflow: "hidden",
        background: "#f8faff",
      }}
    >
      {/* Top right blurred circle */}
      <Box
        pos="absolute"
        w={300}
        h={300}
        style={{
          top: -100,
          right: -80,
          borderRadius: "50%",
          background: "#7950f2",
          filter: "blur(100px)",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      {/* Bottom left blurred circle */}
      <Box
        pos="absolute"
        w={300}
        h={300}
        style={{
          bottom: -100,
          left: -80,
          borderRadius: "50%",
          background: "#339af0",
          filter: "blur(100px)",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      {/* Top left circle rings */}
      <Box
        pos="absolute"
        w={180}
        h={180}
        style={{
          top: -70,
          left: -70,
          borderRadius: "50%",
          border: "2px solid rgba(121, 80, 242, 0.2)",
          boxShadow: `
            0 0 0 20px rgba(121, 80, 242, 0.05),
            0 0 0 40px rgba(121, 80, 242, 0.04)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Bottom right circle rings */}
      <Box
        pos="absolute"
        w={200}
        h={200}
        style={{
          bottom: -80,
          right: -80,
          borderRadius: "50%",
          border: "2px solid rgba(51, 154, 240, 0.2)",
          boxShadow: `
            0 0 0 20px rgba(51, 154, 240, 0.05),
            0 0 0 40px rgba(51, 154, 240, 0.04)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Auth content */}
      <Center
        mih="100vh"
        p="md"
        pos="relative"
        style={{ zIndex: 1 }}
      >
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          withBorder
          w="100%"
          maw={450}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Logo />
          {children}
        </Card>
      </Center>
    </Box>
  );
};

export default AuthLayout;
