import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchPics } from 'components/Api/Api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  // state = {
  //   matches: [],
  //   loading: false,
  //   page: 1,
  //   query: '',
  //   showBtn: false,
  // };
  useEffect(() => {
    if (query === '') return;
    async function fetch() {
      try {
        setLoading(true);
        const { data } = await fetchPics(page, query);

        if (data.hits.length === 0) {
          return toast('Sorry, pictures not found');
        }

        if (data.total > data.hits.length && data.total - page * 12 >= 0) {
          setShowBtn(true);
        }
        if (data.total - page * 12 <= 12) {
          setShowBtn(false);
        }

        setMatches([...matches, ...data.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [query, page, matches]);

  const handleSubmitForm = data => {
    setQuery(data);
    setPage(1);
    setMatches([]);
    setShowBtn(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmitForm}></Searchbar>
      {matches && <ImageGallery matches={matches}></ImageGallery>}
      {loading && <Loader />}
      {showBtn && <Button onClick={() => setPage(page + 1)} />}
      <ToastContainer />
    </div>
  );
};
