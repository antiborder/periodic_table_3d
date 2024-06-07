import '../styles/global.css';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): React.ReactNode  => {
  return <Component {...pageProps} />;
}

export default App;