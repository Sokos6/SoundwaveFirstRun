import { useState, useEffect } from 'react';
import { listSongs } from './graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function App() {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs));
      const songList = songData.data.listSongs.items;
      console.log('song list', songList);
      setSongs(songList);
    } catch (error) {
      console.log('error on fetching songs', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className='App'>
      <header className='app-header'>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
