import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../Context/PostContext/PostContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import PostSomething from "./components/PostSomething";
import PostCard from "../Components/PostCard/PostCard";
import PaginationComponent from "../../Components/Pagination";
import Layout from "../../Layout";

const Home = (): JSX.Element => {
  const { fetchPosts, posts } = useContext(PostContext);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<string>("10");
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!loaded) {
      fetchPosts(String(page), limit)
      setLoaded(true)
    };
  }, [fetchPosts, limit, loaded, page]);

  return (
    <Layout>
      <Container maxWidth="sm" style={{ marginTop: 20 }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={12}>
            <Box mt={3} mb={3}>
              <PostSomething />
            </Box>
            <PostCard posts={posts} />
          </Grid>
        </Grid>
        <PaginationComponent setPage={setPage} setLoaded={setLoaded} />
      </Container>
    </Layout>
  );
};

export default Home;
