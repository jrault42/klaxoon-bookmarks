import React from 'react';
import { TablePagination } from 'react-pagination-table';

function Table2 (props) {

  const headers =  [
    'URL',
    'Titre',
    'Auteur',
    'Date de création',
    'Aperçu',
    'Mots-clés',
    'Actions'
  ]


  return (
    <TablePagination
      title="Bookmarks"
      subTitle=""
      headers={ headers }
      data={ props.bookmarks }
      columns="url.title.author.createDate..keyWords."
      perPageItemCount={ 5 }
      totalCount={ props.nbTotal }
      arrayOption={ [["keyWords", 'all', ', ']] }
    />
  );
}

export default Table2;
