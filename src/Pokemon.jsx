import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Center,
  Flex,
  Button,
  Table,
  Tbody,
  Skeleton,
  SkeletonCircle,
  Tr,
  Td,
} from '@chakra-ui/react';

import axios from 'axios';

const statMap = {
  0: { title: 'HP', color: '#FF5050' },
  1: { title: 'Attack', color: '#F08030' },
  2: { title: 'Defense', color: '#F8D030' },
  3: { title: 'Sp. Atk', color: '#6890F0' },
  4: { title: 'Sp. Def', color: '#78C850' },
  5: { title: 'Speed', color: '#F85888' },
};

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const sprite = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
  const [spriteLoaded, setSpriteLoaded] = useState(false);

  useEffect(() => {
    console.log('reached');
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  return (
    <>
      <Center flexDir='column' mx='auto'>
        <SkeletonCircle mt='50px' size='300px' isLoaded={spriteLoaded}>
          <Image h='300px' src={sprite} onLoad={() => setSpriteLoaded(true)} />
        </SkeletonCircle>
        <Heading
          mt='30px'
          minH='43px'
          textTransform='capitalize'
          color='gray.200'
        >
          {pokemonId}. {pokemon?.name}
        </Heading>

        <Flex h='30px' flexDir='row' mt='10px'>
          {pokemon?.types.map((type) => (
            <Image
              mx='5px'
              h='30px'
              src={`/assets/types/${type.type.name}.png`}
            />
          ))}
        </Flex>

        <Box
          w='350px'
          h='176px'
          m='20px 0 30px 0'
          rounded='15px'
          bg='gray.500'
          p='10px'
        >
          <Skeleton w='330px' h='156px' isLoaded={pokemon} rounded='15px'>
            <Table variant='unstyled'>
              <Tbody>
                {pokemon?.stats.map((stat, key) => {
                  const baseStat = stat.base_stat;
                  const { title, color } = statMap[key];
                  return (
                    <Tr key={key}>
                      <Td
                        p='3px 0 3px 20px'
                        fontWeight='semibold'
                        w='100px'
                        textTransform='capitalize'
                      >
                        {title}:
                      </Td>
                      <Td p='0px'>
                        <Box bg={color} w={`${baseStat * 1.5}px`}>
                          <Text pl='5px'>{baseStat}</Text>
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Skeleton>
        </Box>
        <Button
          _hover={{ bg: 'gray.300', color: 'blue.500' }}
          onClick={() => history.push('/')}
        >
          Back To Pokédex
        </Button>
      </Center>
    </>
  );
};

export default Pokemon;
