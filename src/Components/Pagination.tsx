import { FC, useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { PostContext } from "../Context/PostContext/PostContext";
import { BasicPaginationProp } from "../Interface";

const BasicPagination: FC<BasicPaginationProp> = ({ setPage, setLoaded }): JSX.Element => {
  const { totalPostPages } = useContext(PostContext);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoaded && setLoaded(false);
    setPage(value);
  };

  return (
    <Container maxWidth="sm">
      {totalPostPages > 1 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination
            count={totalPostPages}
            color="primary"
            style={{ marginTop: "30px", marginBottom: "50px" }}
            onChange={handleChange}
          />
        </Grid>
      )}
    </Container>
  );
};

export default BasicPagination;
