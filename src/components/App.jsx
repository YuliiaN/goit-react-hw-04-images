import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import request from 'services/api';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
        setTotalHits(totalHits);
      } catch (error) {
        toast.error('Something went wrong', {
          theme: 'colored',
        });
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

  const showButton = images.length !== totalHits && !loading;

  return (
    <div className="App">
      <Searchbar onSubmit={getQuery} />
      {!!images.length && <ImageGallery images={images} />}
      {showButton && <Button onClick={handleClick} />}
      <ToastContainer autoClose={3000} />
      <Loader loading={loading} />
    </div>
  );
};

export default App;
