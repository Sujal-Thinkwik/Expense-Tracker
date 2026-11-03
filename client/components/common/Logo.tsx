import { Title, Text, Flex, Box } from "@mantine/core";

const Logo = () => {
  return (
    <>
      <Box>
        <Title order={3} ta="center">
          Expense{" "}
          <Text component="span" c="primary" inherit>
            Tracker.
          </Text>
        </Title>
        <Text c="gray.5" fz='sm' textWrap="wrap" ta="center">
          Manage your expenses and track your finances effortlessly.
        </Text>
      </Box>
    </>
  );
};

export default Logo;
