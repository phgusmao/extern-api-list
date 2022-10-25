import './styles.css';

import { useState } from 'react';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(page, postsPerPage);
  }, [handleLoadPosts, page, postsPerPage]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  // const loadMorePosts = () => {

  //   const nextPage = page + postsPerPage;
  //   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
  //   posts.push(...nextPosts);

  //   setPosts(posts);
  //   setPage(nextPage)
  // }

  return (
    <section className='container'>
      <div className='search-container'>

        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}></Posts>
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button disabled={noMorePosts} text="Load more posts" ></Button>
          // onClick={loadMorePosts}
        )}
      </div>
    </section>
  );
}

export default Home;
