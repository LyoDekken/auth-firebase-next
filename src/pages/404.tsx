import Link from 'next/link';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      textAlign="center"
      p={8}
      backgroundColor="#f4f4f4"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="2xl" mb={4} color="#333">
        Oops! Página não encontrada.
      </Heading>
      <Text fontSize="xl" mb={8} color="#555">
        A página que você está procurando não existe.
      </Text>
      <Link href="/" passHref>
        <Button colorScheme="blue" size="lg">
          Voltar para a página inicial
        </Button>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
