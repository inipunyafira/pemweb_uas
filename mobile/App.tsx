import React from 'react';
import { WebView } from 'react-native-webview';

const App = () => {
    return (
        <WebView source={{ uri: 'http://localhost:3001/api/berita' }} />
    );
}

export default App;
