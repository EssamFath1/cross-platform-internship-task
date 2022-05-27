import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getAPI(page.toString()).then(data =>
      setData(prev => [...prev, ...data]),
    );
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={item => renderItems(item)}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
export default App;
function renderFooter() {
  return <ActivityIndicator />;
}
const renderItems = item => {
  const posterURL = 'https://image.tmdb.org/t/p/original' + item.item.poster_path;
  return (
    <Card containerStyle={styles.container}>
      <View>
        <Image source={{uri: posterURL}} style={styles.posterStyle} />
        <View style={styles.movieDetailsWrapper}>
          <View style={styles.titleAndDateWrapper}>
            <Text style={styles.titleStyle}>{item.item.title}</Text>
            <Text>
              <Text style={styles.overviewHeadStyle}>Date : </Text>
              {item.item.release_date}
            </Text>
          </View>
          <Text>
            <Text style={styles.overviewHeadStyle}>Description : </Text>
            {item.item.overview}
          </Text>
        </View>
      </View>
    </Card>
  );
};
const getAPI = async page => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=${page}`,
    );

    return response?.data.results;
  } catch (error) {
    console.log(error);
  }
  return [];
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  posterStyle: {
    width: 320,
    height: 300,
    resizeMode: 'stretch',
  },
  titleAndDateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginRight: 15,
  },
  movieDetailsWrapper: {
    flex: 1,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  overviewHeadStyle: {
    fontWeight: 'bold',
    color: '#000',
  },
});