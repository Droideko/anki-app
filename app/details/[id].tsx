import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

const Details = () => {
  const { id } = useLocalSearchParams();
  const { setParams, push } = useRouter();

  // router.push({ pathname: '/account/settings', params: { user: 'jane' } });

  return (
    <View>
      <Stack.Screen options={{ headerTitle: `Details ${id}` }} />
      <Text>DetailsId {id} </Text>
      <Button
        title="Option 44"
        onPress={() =>
          push({
            pathname: `/details/${id}/options/44`,
            params: { user: 'jane' },
          })
        }
      />
      <Link href={`/details/${id}/options/44`}>
        <Text>Options</Text>
      </Link>
      <Button title="Update to 999" onPress={() => setParams({ id: '999' })} />
    </View>
  );
};

export default Details;
