import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

function CommentSection({ url, identifier, title }) {
  return (
    <>
    <hr></hr>
      <h2 style={{color:"#000000" }}>Comment Section</h2>
      <DiscussionEmbed 
        shortname='example'
        config={{
          url: url, // Use the dynamic URL prop
          identifier: identifier, // Use the dynamic identifier prop
          title: title, // Use the dynamic title prop
        }}
      />
    </>
  );
}

export default CommentSection;
