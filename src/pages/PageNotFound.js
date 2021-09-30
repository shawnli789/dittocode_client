import { Helmet } from "react-helmet";

function PageNotFound() {
  return (
    <div className='text-center' style={{ marginTop: "20%" }}>
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="404 Page Not Found" />
      </Helmet>
      <p style={{ fontSize: '3rem' }}>Ops, Page Not Found</p>
      <p style={{ fontSize: '3rem' }}>404</p>
    </div>
  );
}

export default PageNotFound;