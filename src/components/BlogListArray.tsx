import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BlogListArray = ({ query }: { query: string }) => {


  return (
    <div>
      <h1>Query :: {query}</h1>

    </div>
  );
};

export default BlogListArray;
