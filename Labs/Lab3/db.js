const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'Book-Harry',
      content: 'All the collection of the Harry Potter saga',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: 'c1b6baaf-3411-4a68-8d9a-14d89e4faa54',
      title: 'DVD-Batman',
      content: 'A DVD of a batman movie',
      date: '04/11/2022',
      author: 'John Smith'
    },
    {
      id: 'af6e2b6f-0c9d-49e5-a5f5-6b8c5cde0d71',
      title: 'Book-How to cook',
      content: 'A book that has several recipes in order to cook properly',
      date: '04/12/2022',
      author: 'Jane Doe'
    }
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Very interesting',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    },
    {
      id: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
      timestamp: 1664835065,
      content: 'Little bit disapointed of the article',
      articleId: 'c1b6baaf-3411-4a68-8d9a-14d89e4faa54',
      author: 'Tom Hanks'
    },
    {
      id: 'c81e728d-b02e-331f-afa4-00e59e014b75',
      timestamp: 1664835080,
      content: 'Happy to have find it in that store',
      articleId: 'af6e2b6f-0c9d-49e5-a5f5-6b8c5cde0d71',
      author: 'Kate Winslet'
    },
    {
      id: 'eccbc87e-4b5c-32fe-a830-3b53f699affc',
      timestamp: 1664835099,
      content: 'Was searching for it in several sotres before finding it here',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Alice Cooper'
    }
  ]
};

module.exports = db;
