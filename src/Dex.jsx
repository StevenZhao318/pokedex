import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Input,
  Center,
  chakra,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import axios from 'axios';

const Dex = (props) => {
  const { history } = props;
  const [data, setData] = useState({});
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then((response) => {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setData(newPokemonData);
      });
  }, []);

  return (
    <>
      <Center
        h='80px'
        bg='blue.700'
        pos='fixed'
        w='100%'
        zIndex='10'
        mt='-80px'
      >
        <Input
          w={{ lg: '500px', base: '70%' }}
          placeholder='Search Pokemon'
          _focus={{ bg: 'gray.100' }}
          bg='gray.300'
          onChange={handleSearchChange}
        />
      </Center>
      <Center mt='80px'>
        <SimpleGrid
          mx='auto'
          mt='50px'
          columns={{ lg: 4, base: 2 }}
          spacing={{ lg: '50px', base: '20px' }}
        >
          {Object.keys(data).map(
            (id, key) =>
              data[id].name.includes(filter) && (
                <Card key={key} history={history} content={data[id]} />
              )
          )}
        </SimpleGrid>
      </Center>
    </>
  );
};

const Card = chakra(function ({ content, history, className }) {
  const { id, name } = content;
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Center
      flexDir='column'
      className={className}
      bg='gray.500'
      h='150px'
      w='150px'
      onClick={() => history.push(`/${id}`)}
      cursor='pointer'
      _hover={{
        bg: 'gray.400',
        transform: 'scale(1.05)',
        boxShadow: '5px 5px 15px rgba(0,0,0,0.6)',
      }}
      transition='0.3s ease'
      borderRadius='20px'
    >
      <Image h='100px' src={sprite} />
      <Heading textAlign='center' size='sm' textTransform='capitalize'>
        {id}. {name}
      </Heading>
    </Center>
  );
});

export default Dex;
