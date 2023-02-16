import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import request from 'services/api';

// export default class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     loading: false,
//     error: '',
//     images: [],
//     totalHits: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;

//     // маркер обновления состояния

//     if (prevState.query !== query || prevState.page !== page) {
//       try {
//         this.setState({ loading: true });
//         const { hits, totalHits } = await request(query, page);

//         // ошибка, если запрос ничего не возвращает

//         if (!hits.length) {
//           toast.error(`We didn't find any ${query} images`, {
//             theme: 'colored',
//           });
//           return;
//         }

//         // если все ок

//         if (page > 1) {
//           toast.success(`We have found ${12} more of ${totalHits} images`, {
//             theme: 'colored',
//           });
//         } else {
//           toast.success(`We have found ${12} of ${totalHits} images`, {
//             theme: 'colored',
//           });
//         }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           error: '',
//           totalHits,
//         }));
//       } catch (error) {
//         toast.error('Something went wrong', {
//           theme: 'colored',
//         });
//         this.setState({ error: 'Something went wrong' });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   // обработка клика по кнопке load more

//   handleClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   // получаем из формы имя запроса и добавляем в state

//   getQuery = query => {
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//       totalHits: 0,
//     });
//   };

//   render() {
//     const { images, loading, totalHits } = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.getQuery} />
//         {!!images.length && <ImageGallery images={images} />}
//         {images.length !== totalHits && !loading ? (
//           <Button onClick={this.handleClick} />
//         ) : (
//           false
//         )}
//         <ToastContainer autoClose={3000} />
//         <Triangle
//           height="100"
//           width="100"
//           color="#3f51b5"
//           ariaLabel="triangle-loading"
//           visible={loading}
//           wrapperStyle={{ margin: '0 auto' }}
//         />
//       </div>
//     );
//   }
// }

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    (async function fetch() {
      try {
        setLoading(true);

        const { hits, totalHits } = await request(query, page);
        if (!hits.length) {
          toast.error(`We didn't find any ${query} images`, {
            theme: 'colored',
          });
          return;
        }

        if (page > 1) {
          toast.success(`We have found ${12} more of ${totalHits} images`, {
            theme: 'colored',
          });
        } else {
          toast.success(`We have found ${12} of ${totalHits} images`, {
            theme: 'colored',
          });
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setError('');
        setTotalHits(totalHits);
      } catch (error) {
        toast.error('Something went wrong', {
          theme: 'colored',
        });
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  }, [query, page]);

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={getQuery} />
      {!!images.length && <ImageGallery images={images} />}
      {images.length !== totalHits && !loading ? (
        <Button onClick={handleClick} />
      ) : (
        false
      )}
      <ToastContainer autoClose={3000} />
      <Triangle
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="triangle-loading"
        visible={loading}
        wrapperStyle={{ margin: '0 auto' }}
      />
    </div>
  );
};

export default App;
