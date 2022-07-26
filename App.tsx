import { StyleSheet, Text, View, Image } from 'react-native';
import Board from './components/board/Board';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import fish from './stockfish.js';
import { useEffect, useState } from 'react';
import { mainLoop, shutdownStockfish, sendCommand } from 'react-native-stockfish-android';
import { NativeEventEmitter, NativeModules } from 'react-native';

export default function App() {
  // const [html, setHtml] = useState("");
  // useEffect(() => {
  //   fetch(Image.resolveAssetSource(require("./stockfish.html")).uri)
  //   .then(r => r.text())
  //   .then((res) => setHtml(res))
  // }, []);
  // console.log(Image.resolveAssetSource(require("./stockfish.html")).uri);
  // console.log(Image.resolveAssetSource(require("./stockfish.js")).uri);
  // console.log(require("./stockfish.html"));
  // const f = fish();
  // console.log(fish);
  useEffect(() => {
    const func = async () => {
      const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeStockfishChessEngine);
      const eventListener = eventEmitter.addListener('stockfish-output', (line) => {
        console.log("Stockfish output: " + line);
      });
      await mainLoop();
      await sendCommand("uci\n");
    }
    func();
  });
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      {/* <WebView style={{width: 100, height:20, backgroundColor: "red"}} originWhitelist={['*']} source={{html: "<h1>asdasd</h1>" }} /> */}
      {/* <WebView style={{width: 100, height:20, backgroundColor: "red"}} originWhitelist={['*']} source={{html}} /> */}
      <Board fen={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
